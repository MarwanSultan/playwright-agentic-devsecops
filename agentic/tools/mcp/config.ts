import path from 'node:path';

const PROJECT_ROOT = process.cwd();

export const MCP_SERVERS = {
  playwright: {
    transport: 'stdio' as const,
    command: 'npx',
    args: ['-y', '@playwright/mcp@latest'],
  },

  filesystem: {
    transport: 'stdio' as const,
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-filesystem', PROJECT_ROOT],
  },

  git: {
    transport: 'stdio' as const,
    command: 'uvx',
    args: ['mcp-server-git', '--repository', path.resolve(PROJECT_ROOT)],
  },
};
