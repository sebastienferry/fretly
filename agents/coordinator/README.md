# Fretly Agents — Coordinator

This is a minimal scaffold for the coordinator service that claims issues labeled `to-spec` and dispatches them through a simple 3-phase pipeline: **idea → spec → code → review → done**.

## Key Features

- **GitHub App Authentication**: Secure authentication using GitHub App credentials
- **Webhook Processing**: Handles GitHub webhook events for issues, issue comments, and pull requests
- **Command Processing**: Supports slash commands in issue comments (`/spec`, `/dev`, `/review`, `/done`, `/status`)
- **Agent Dispatch**: Can dispatch tasks to product owners and developers via webhooks or GitHub mentions
- **Pipeline Tracking**: Uses GitHub labels to track issue progress through the pipeline

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Fretly Agents Coordinator                   │
├─────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  Webhook     │    │  GitHub API   │    │   Dispatcher  │  │
│  │  Receiver     │───▶│  Client      │───▶│   Service    │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│        ▲                  ▲                  ▲              │
│        │                  │                  │              │
│  ┌─────┴─────┐      ┌─────┴─────┐      ┌─────┴─────┐       │
│  │GitHub Web- │      │  Octokit  │      │ HTTP/     │       │
│  │  hooks     │      │  Library  │      │ GitHub    │       │
│  └───────────┘      └───────────┘      │ Mentions  │       │
│                                          └───────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Pipeline Flow

1. **Issue Creation**: User creates an issue with the `to-spec` label
2. **Coordinator Pickup**: Webhook receives the issue, coordinator adds `status:spec-pending` label
3. **Product Owner Notification**: Product owner is notified to create/approve specification
4. **Spec Approval**: Product owner uses `/spec` command to approve specification
5. **Developer Notification**: Developer is notified to implement
6. **Development**: Developer uses `/dev` command when starting work
7. **Review**: Developer uses `/review` command when ready for review
8. **Completion**: Maintainer uses `/done` command when complete

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- GitHub repository to monitor
- GitHub App with appropriate permissions

### Installation

```bash
cd agents/coordinator
npm install
```

### Configuration

Create a `.env` file in the coordinator directory:

```bash
# GitHub App Configuration
GITHUB_APP_ID=your_app_id
GITHUB_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GITHUB_WEBHOOK_SECRET=your_webhook_secret

# Repository Configuration
REPO_OWNER=sebastienferry
REPO_NAME=fretly

# Agent Configuration
PRODUCT_OWNER=github_username_or_webhook_url
DEVELOPER=github_username_or_webhook_url
AGENT_DISPATCH_MODE=auto

# Server Configuration
PORT=3000
```

### Running

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## GitHub App Setup

### Create a GitHub App

1. Go to [GitHub App Settings](https://github.com/settings/apps)
2. Click "New GitHub App"
3. **Application Name**: `fretly-agents-coordinator` (or your choice)
4. **Homepage URL**: `https://your-domain.com` (or `http://localhost:3000` for testing)
5. **Callback URL**: Leave empty (not needed for webhooks)

### Webhook Configuration

1. **Webhook URL**: `https://your-domain.com/webhook` (or `http://localhost:3000/webhook` for testing)
2. **Webhook Secret**: Set a strong secret (use this as `GITHUB_WEBHOOK_SECRET`)
3. **Subscribe to events**:
   - ✅ Issues
   - ✅ Issue comment
   - ✅ Pull request

### Permissions

Minimum required permissions:

- **Issues**: Read & write
- **Pull requests**: Read & write (optional, for PR monitoring)
- **Metadata**: Read-only

### Install the App

1. After creating the app, click "Install App"
2. Select your repository (`sebastienferry/fretly`)
3. Save the **App ID** and **Installation ID**
4. Download the **Private Key** (PEM format)

## Local Testing with ngrok

For local development without a public URL:

1. Install ngrok: `npm install -g ngrok` or download from [ngrok.com](https://ngrok.com)
2. Start ngrok: `ngrok http 3000`
3. Use the ngrok public URL as your GitHub App webhook URL
4. Update your `.env` file with the ngrok URL
5. Start the coordinator: `npm run dev`

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GITHUB_APP_ID` | Yes | - | GitHub App ID |
| `GITHUB_PRIVATE_KEY` | Yes | - | GitHub App private key (PEM format) |
| `GITHUB_WEBHOOK_SECRET` | Yes | - | Webhook secret for signature verification |
| `REPO_OWNER` | No | `sebastienferry` | Repository owner |
| `REPO_NAME` | No | `fretly` | Repository name |
| `PRODUCT_OWNER` | No | - | Product owner username or webhook URL |
| `DEVELOPER` | No | - | Developer username or webhook URL |
| `AGENT_DISPATCH_MODE` | No | `auto` | Dispatch mode: `auto` or `manual` |
| `PORT` | No | `3000` | Server port |

## Available Commands

Use these commands in issue comments to control the pipeline:

| Command | Description | Required Labels |
|---------|-------------|----------------|
| `/spec` | Approve specification and notify developer | `to-spec`, `status:spec-pending` |
| `/dev` | Mark as in development | Any |
| `/review` | Mark as ready for review | Any |
| `/done` | Mark as completed | Any |
| `/status` | Show current pipeline status | Any |

## Pipeline Labels

The coordinator uses these labels to track issue progress:

- `to-spec` - Issue should be processed by the coordinator
- `status:spec-pending` - Waiting for specification
- `status:spec-approved` - Specification approved
- `status:in-development` - Development in progress
- `status:review-pending` - Ready for review
- `status:done` - Completed

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/webhook` | GitHub webhook receiver |
| GET | `/health` | Health check endpoint |

## Project Structure

```
agents/coordinator/
├── src/
│   ├── config.ts          # Configuration management
│   ├── github.ts          # GitHub API client
│   ├── dispatcher.ts      # Agent dispatch logic
│   └── index.ts           # Main server and webhook handler
├── package.json
├── tsconfig.json
└── README.md
```

## Next Steps

1. **Deploy the Coordinator**: Deploy to a hosting service (Vercel, Railway, Fly.io, etc.)
2. **Configure GitHub App**: Update webhook URL to your deployment
3. **Test the Pipeline**: Create a test issue with the `to-spec` label
4. **Add More Features**:
   - Project board synchronization
   - More sophisticated dispatch logic
   - Error handling and retries
   - Metrics and logging
   - Rate limiting

## License

MIT License - same as the main Fretly project.
