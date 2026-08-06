import express from "express";
import crypto from "crypto";
import bodyParser from "body-parser";
import { config } from "./config";
import { getAppOctokit, getInstallationOctokit, commentIssue, addLabel, addAssignee, getIssueLabels } from "./github";
import { dispatchToAgent, dispatchToProductOwner, dispatchToDeveloper } from "./dispatcher";

const app = express();
app.use(bodyParser.json());

// Webhook signature verification middleware
function verifyWebhookSignature(req: express.Request, res: express.Response, next: express.NextFunction) {
  const signature = req.headers["x-hub-signature-256"] as string;
  const payload = JSON.stringify(req.body);
  
  if (!signature || !config.webhookSecret) {
    return res.status(401).send("Unauthorized: Missing signature or secret");
  }
  
  const hmac = crypto.createHmac("sha256", config.webhookSecret);
  hmac.update(payload);
  const expectedSignature = `sha256=${hmac.digest("hex")}`;
  
  if (signature !== expectedSignature) {
    return res.status(401).send("Unauthorized: Invalid signature");
  }
  
  next();
}

// Webhook endpoint
app.post(config.webhookPath, verifyWebhookSignature, async (req, res) => {
  const event = req.headers["x-github-event"] as string;
  const payload = req.body;
  
  console.log(`Received webhook event: ${event}`);
  
  try {
    switch (event) {
      case "issues":
        await handleIssueEvent(payload);
        break;
      case "issue_comment":
        await handleIssueCommentEvent(payload);
        break;
      case "pull_request":
        await handlePullRequestEvent(payload);
        break;
      default:
        console.log(`Unhandled event type: ${event}`);
    }
    
    res.status(200).send("OK");
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send("Error processing webhook");
  }
});

async function handleIssueEvent(payload: any) {
  const action = payload.action;
  const issue = payload.issue;
  const repository = payload.repository;
  
  if (!issue || !repository) {
    console.log("Missing issue or repository in payload");
    return;
  }
  
  const owner = repository.owner.login;
  const repo = repository.name;
  const issueNumber = issue.number;
  
  console.log(`Issue event: ${action} on ${owner}/${repo}#${issueNumber}`);
  
  // Only process opened issues
  if (action !== "opened") {
    return;
  }
  
  // Check if issue has the "to-spec" label
  const labels = issue.labels.map((label: any) => label.name);
  if (labels.includes("to-spec")) {
    await processToSpecIssue(owner, repo, issueNumber, issue);
  }
}

async function handleIssueCommentEvent(payload: any) {
  const action = payload.action;
  const issue = payload.issue;
  const comment = payload.comment;
  const repository = payload.repository;
  
  if (!issue || !comment || !repository) {
    console.log("Missing issue, comment, or repository in payload");
    return;
  }
  
  const owner = repository.owner.login;
  const repo = repository.name;
  const issueNumber = issue.number;
  
  console.log(`Issue comment event: ${action} on ${owner}/${repo}#${issueNumber}`);
  
  // Check if this is a command comment (e.g., "/spec", "/dev", "/review")
  const commentBody = comment.body;
  if (commentBody.startsWith("/")) {
    await processCommandComment(owner, repo, issueNumber, commentBody, comment.user.login);
  }
}

async function handlePullRequestEvent(payload: any) {
  const action = payload.action;
  const pullRequest = payload.pull_request;
  const repository = payload.repository;
  
  if (!pullRequest || !repository) {
    console.log("Missing pull request or repository in payload");
    return;
  }
  
  const owner = repository.owner.login;
  const repo = repository.name;
  const prNumber = pullRequest.number;
  
  console.log(`PR event: ${action} on ${owner}/${repo}#${prNumber}`);
  
  // Handle PR reviews, merges, etc.
  // For now, just log
}

async function processToSpecIssue(owner: string, repo: string, issueNumber: number, issue: any) {
  console.log(`Processing to-spec issue: ${owner}/${repo}#${issueNumber}`);
  
  try {
    // Add initial comment to acknowledge the issue
    const initialComment = `🤖 **Fretly Agents Coordinator** has picked up this issue for processing through the spec → code pipeline.

**Next Steps:**
- 📝 Product Owner will be notified to create/approve specification
- 🔧 Developer will be notified to implement once spec is approved
- 📋 Issue will be moved through: **idea → spec → code → review → done**

*Reply with /status for current pipeline status.*`;
    
    await commentIssue(owner, repo, issueNumber, initialComment);
    
    // Add processing label
    await addLabel(owner, repo, issueNumber, "status:spec-pending");
    
    // Notify product owner
    const productOwnerPayload = {
      type: "issue_assigned",
      issue: {
        owner,
        repo,
        number: issueNumber,
        title: issue.title,
        body: issue.body,
        url: issue.html_url,
      },
      action: "create_spec",
      timestamp: new Date().toISOString(),
    };
    
    await dispatchToProductOwner(productOwnerPayload);
    
    // If in auto mode, also notify developer
    if (config.agentDispatchMode === "auto") {
      const developerPayload = {
        type: "issue_assigned",
        issue: {
          owner,
          repo,
          number: issueNumber,
          title: issue.title,
          body: issue.body,
          url: issue.html_url,
        },
        action: "await_spec",
        timestamp: new Date().toISOString(),
      };
      
      await dispatchToDeveloper(developerPayload);
    }
    
    console.log(`Successfully processed to-spec issue ${owner}/${repo}#${issueNumber}`);
    
  } catch (error) {
    console.error(`Error processing to-spec issue ${owner}/${repo}#${issueNumber}:`, error);
    
    // Add error comment to the issue
    try {
      await commentIssue(owner, repo, issueNumber, 
        `⚠️ **Coordinator Error**: Failed to process this issue. Please check logs. Error: ${error instanceof Error ? error.message : String(error)}`
      );
    } catch (commentError) {
      console.error("Failed to add error comment:", commentError);
    }
  }
}

async function processCommandComment(
  owner: string,
  repo: string,
  issueNumber: number,
  commentBody: string,
  commenter: string
) {
  const command = commentBody.trim().toLowerCase();
  
  console.log(`Processing command: ${command} from @${commenter} on ${owner}/${repo}#${issueNumber}`);
  
  try {
    const labels = await getIssueLabels(owner, repo, issueNumber);
    
    switch (command) {
      case "/spec":
        if (!labels.includes("status:spec-pending") && !labels.includes("status:spec-approved")) {
          await commentIssue(owner, repo, issueNumber, 
            `@${commenter} This issue is not in the spec pipeline. Add the 'to-spec' label to start processing.`
          );
          return;
        }
        
        await addLabel(owner, repo, issueNumber, "status:spec-approved");
        await commentIssue(owner, repo, issueNumber, 
          `✅ **Spec Approved** by @${commenter}

🔧 Developer notification sent for implementation.`
        );
        
        // Notify developer to start implementation
        const developerPayload = {
          type: "spec_approved",
          issue: { owner, repo, number: issueNumber },
          approvedBy: commenter,
          timestamp: new Date().toISOString(),
        };
        
        await dispatchToDeveloper(developerPayload);
        break;
        
      case "/dev":
        await addLabel(owner, repo, issueNumber, "status:in-development");
        await commentIssue(owner, repo, issueNumber, 
          `🔨 **Development Started** by @${commenter}`
        );
        break;
        
      case "/review":
        await addLabel(owner, repo, issueNumber, "status:review-pending");
        await commentIssue(owner, repo, issueNumber, 
          `👀 **Ready for Review** by @${commenter}`
        );
        break;
        
      case "/done":
        await addLabel(owner, repo, issueNumber, "status:done");
        await commentIssue(owner, repo, issueNumber, 
          `🎉 **Completed** by @${commenter}`
        );
        break;
        
      case "/status":
        const statusComment = `📊 **Pipeline Status** for ${owner}/${repo}#${issueNumber}:

Current Labels: ${labels.join(", ") || "None"}

**Pipeline Stages:**
- 💡 idea → ${labels.includes("to-spec") ? "✅" : "⏳"}
- 📝 spec → ${labels.includes("status:spec-approved") ? "✅" : labels.includes("status:spec-pending") ? "🔄" : "⏳"}
- 🔧 code → ${labels.includes("status:in-development") ? "🔄" : labels.includes("status:code-done") ? "✅" : "⏳"}
- 👀 review → ${labels.includes("status:review-pending") ? "🔄" : labels.includes("status:review-approved") ? "✅" : "⏳"}
- ✅ done → ${labels.includes("status:done") ? "✅" : "⏳"}`;
        
        await commentIssue(owner, repo, issueNumber, statusComment);
        break;
        
      default:
        await commentIssue(owner, repo, issueNumber, 
          `@${commenter} Unknown command: ${commentBody}. Available commands: /spec, /dev, /review, /done, /status`
        );
    }
    
  } catch (error) {
    console.error(`Error processing command ${command}:`, error);
    await commentIssue(owner, repo, issueNumber, 
      `@${commenter} Error processing command: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Fretly Agents Coordinator running on port ${PORT}`);
  console.log(`Webhook endpoint: ${config.webhookPath}`);
  console.log(`GitHub App ID: ${config.appId ? "***" : "Not configured"}`);
  console.log(`Repo: ${config.repoOwner}/${config.repoName}`);
});

export default app;
