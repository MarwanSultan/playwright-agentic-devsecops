import { MultiServerMCPClient } from '@langchain/mcp-adapters';

import { MCP_SERVERS } from './config';

let client: MultiServerMCPClient | undefined;

export function getMcpClient(): MultiServerMCPClient {
  if (!client) {
    client = new MultiServerMCPClient(MCP_SERVERS);
  }

  return client;
}

export async function getMcpTools() {
  const mcpClient = getMcpClient();

  return await mcpClient.getTools();
}
