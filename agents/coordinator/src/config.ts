export const config = {
  appId: process.env.GITHUB_APP_ID || "",
  privateKey: process.env.GITHUB_PRIVATE_KEY || "",
  webhookSecret: process.env.GITHUB_WEBHOOK_SECRET || "",
  repoOwner: process.env.REPO_OWNER || "sebastienferry",
  repoName: process.env.REPO_NAME || "fretly",
  productOwner: process.env.PRODUCT_OWNER || "",
  developer: process.env.DEVELOPER || "",
  agentDispatchMode: process.env.AGENT_DISPATCH_MODE || "auto",
  port: parseInt(process.env.PORT || "3000"),
  webhookPath: "/webhook"
};

export type Config = typeof config;
