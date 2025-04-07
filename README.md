# Discord VPS Tmate Bot

A Discord bot that deploys a Docker container with `tmate` and sends a shareable terminal session via Discord.

## Requirements

- Docker
- Node.js
- Bash
- A bot token and App ID from the Discord Developer Portal

## Setup

1. Clone the repo
2. Copy `.env.example` to `.env` and fill in your credentials
3. Run:

```bash
npm install
chmod +x deploy_tmate.sh
node index.js
