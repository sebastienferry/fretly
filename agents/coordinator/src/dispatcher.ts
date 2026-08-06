import fetch from "node-fetch";
import { config } from "./config";

export async function dispatchToAgent(target: string, payload: any): Promise<void> {
  // target can be a GitHub username or a webhook URL. If it looks like a URL, POST.
  const isUrl = target.startsWith("http://") || target.startsWith("https://");
  
  if (isUrl) {
    // POST to webhook URL
    try {
      const response = await fetch(target, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "fretly-agents-coordinator",
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}: ${response.statusText}`);
      }
      
      console.log(`Dispatched to ${target}:`, payload);
    } catch (error) {
      console.error(`Error dispatching to ${target}:`, error);
      throw error;
    }
  } else {
    // Target is a GitHub username - create an issue comment mention
    // This will notify the user via GitHub notifications
    console.log(`Would mention @${target} in GitHub issue comment with payload:`, payload);
    // In a real implementation, this would call commentIssue() from github.ts
    // For now, we'll just log it since we need the issue context
  }
}

export async function dispatchToProductOwner(payload: any): Promise<void> {
  if (!config.productOwner) {
    console.warn("No PRODUCT_OWNER configured, skipping dispatch");
    return;
  }
  await dispatchToAgent(config.productOwner, payload);
}

export async function dispatchToDeveloper(payload: any): Promise<void> {
  if (!config.developer) {
    console.warn("No DEVELOPER configured, skipping dispatch");
    return;
  }
  await dispatchToAgent(config.developer, payload);
}
