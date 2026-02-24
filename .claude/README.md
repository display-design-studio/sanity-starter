# Agent Configuration

This directory contains configuration and context for AI coding agents.

## Sanity MCP Server

This project uses the [Sanity MCP Server](https://www.sanity.io/docs/ai/mcp-server) to enable AI assistants to interact with Sanity.

### Quick Setup

The easiest way is via CLI:

```bash
npx sanity@latest mcp configure
```

### Manual Configuration

#### OpenCode

Add to your `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "sanity": {
      "type": "remote",
      "url": "https://mcp.sanity.io",
      "oauth": {}
    }
  }
}
```

Then authenticate:

```bash
opencode mcp auth sanity
```

#### Cursor

Add to your `mcp.json`:

```json
{
  "mcpServers": {
    "Sanity": {
      "type": "http",
      "url": "https://mcp.sanity.io"
    }
  }
}
```

#### VS Code

Open Command Palette > `MCP: Open User Configuration`:

```json
{
  "servers": {
    "Sanity": {
      "type": "http",
      "url": "https://mcp.sanity.io"
    }
  }
}
```

#### Claude Code

```bash
claude mcp add Sanity -t http https://mcp.sanity.io --scope user
```

### Authentication

The MCP server uses **OAuth by default**. After configuration, you'll be prompted to authenticate with your Sanity account.

Alternatively, you can use an **API token** by setting the Authorization header:

```json
{
  "mcpServers": {
    "Sanity": {
      "url": "https://mcp.sanity.io",
      "headers": {
        "Authorization": "Bearer sk..."
      }
    }
  }
}
```

Create API tokens from [sanity.io/manage](https://www.sanity.io/manage) or via CLI:

```bash
sanity tokens create
```

> **Note:** OAuth sessions expire after ~7 days. If you encounter 401 errors, re-authenticate or run `npx sanity@latest mcp configure` again.

For more details on authentication, see the [official documentation](https://www.sanity.io/docs/ai/mcp-server#e4d6a37648fb).

## Sanity Skills

### Install via npx (Recommended)

Install Sanity official skills from [skills.sh](https://skills.sh/sanity-io/agent-toolkit):

```bash
npx skills add sanity-io/agent-toolkit
```

This installs:

- `sanity-best-practices` - GROQ, schema, Visual Editing, Portable Text, images, Studio config
- `seo-aeo-best-practices` - SEO, structured data, EEAT principles
- `content-modeling-best-practices` - Content architecture and schema design
- `content-experimentation-best-practices` - A/B testing methodology

### Load via MCP

If using the Sanity MCP server, you can also load rules dynamically:

```
get_sanity_rules({ rules: [
  "sanity-schema",
  "sanity-groq",
  "sanity-localization",
  "sanity-studio-structure",
  "sanity-typegen"
]})
```

See [available MCP rules](https://www.sanity.io/docs/ai/mcp-server#k4ae680bb2e88) for the full list.
