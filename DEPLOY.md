# Deploy (Cloudflare Pages)

This repo is static (HTML/CSS/JS) and deploys via GitHub Actions using Wrangler.

## GitHub repo settings

### Secrets

Set either of these (both workflows accept either name):

- `CLOUDFLARE_API_TOKEN` *(or `CF_API_TOKEN`)*
  - Token needs **Cloudflare Pages:Edit** for the target account.
- `CF_ACCOUNT_ID`

### Variables

- `CF_PAGES_PROJECT`
  - The Cloudflare Pages project name (e.g. `freak51`).

## Workflows

- Production: runs on `push` to `main` → deploys to `--branch main`
- Preview: runs on PRs → deploys to `--branch pr-<number>` and comments the preview URL

## Custom domain

Configure `freak51.com` inside Cloudflare Pages (UI) for the `main` branch.
