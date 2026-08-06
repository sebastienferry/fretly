import { Octokit } from "@octokit/core";
import { createAppAuth } from "@octokit/auth-app";
import { config } from "./config";

let octokitInstance: Octokit | null = null;

export async function getAppOctokit(): Promise<Octokit> {
  if (!octokitInstance) {
    const auth = createAppAuth({
      appId: config.appId,
      privateKey: config.privateKey,
    });
    
    octokitInstance = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: config.appId,
        privateKey: config.privateKey,
      },
    });
  }
  return octokitInstance;
}

export async function getInstallationOctokit(installationId: number): Promise<Octokit> {
  const appOctokit = await getAppOctokit();
  
  const { data: installation } = await appOctokit.request(
    "GET /app/installations/{installation_id}",
    { installation_id: installationId }
  );
  
  return new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: config.appId,
      privateKey: config.privateKey,
      installationId: installation.id,
    },
  });
}

export async function getInstallationIdForRepo(owner: string, repo: string): Promise<number | null> {
  const octokit = await getAppOctokit();
  
  try {
    const { data: installations } = await octokit.request(
      "GET /app/installations",
      { per_page: 100 }
    );
    
    for (const installation of installations) {
      if (installation.account?.login === owner) {
        const { data: repos } = await octokit.request(
          "GET /user/installations/{installation_id}/repositories",
          { installation_id: installation.id }
        );
        
        if (repos.repositories.some((r: any) => r.name === repo)) {
          return installation.id;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting installation ID:", error);
    return null;
  }
}

export async function commentIssue(
  owner: string,
  repo: string,
  issueNumber: number,
  body: string
): Promise<void> {
  const installationId = await getInstallationIdForRepo(owner, repo);
  if (!installationId) {
    throw new Error(`No installation found for ${owner}/${repo}`);
  }
  
  const octokit = await getInstallationOctokit(installationId);
  
  await octokit.request(
    "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner,
      repo,
      issue_number: issueNumber,
      body,
    }
  );
}

export async function addLabel(
  owner: string,
  repo: string,
  issueNumber: number,
  label: string
): Promise<void> {
  const installationId = await getInstallationIdForRepo(owner, repo);
  if (!installationId) {
    throw new Error(`No installation found for ${owner}/${repo}`);
  }
  
  const octokit = await getInstallationOctokit(installationId);
  
  await octokit.request(
    "POST /repos/{owner}/{repo}/issues/{issue_number}/labels",
    {
      owner,
      repo,
      issue_number: issueNumber,
      labels: [label],
    }
  );
}

export async function addAssignee(
  owner: string,
  repo: string,
  issueNumber: number,
  assignee: string
): Promise<void> {
  const installationId = await getInstallationIdForRepo(owner, repo);
  if (!installationId) {
    throw new Error(`No installation found for ${owner}/${repo}`);
  }
  
  const octokit = await getInstallationOctokit(installationId);
  
  await octokit.request(
    "POST /repos/{owner}/{repo}/issues/{issue_number}/assignees",
    {
      owner,
      repo,
      issue_number: issueNumber,
      assignees: [assignee],
    }
  );
}

export async function getIssueLabels(
  owner: string,
  repo: string,
  issueNumber: number
): Promise<string[]> {
  const installationId = await getInstallationIdForRepo(owner, repo);
  if (!installationId) {
    throw new Error(`No installation found for ${owner}/${repo}`);
  }
  
  const octokit = await getInstallationOctokit(installationId);
  
  const { data: labels } = await octokit.request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}/labels",
    {
      owner,
      repo,
      issue_number: issueNumber,
    }
  );
  
  return labels.map((label: any) => label.name);
}
