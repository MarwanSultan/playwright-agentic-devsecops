import { getMcpTools } from './client';

async function main() {
  const tools = await getMcpTools();

  console.log('\nMCP tools loaded:\n');

  for (const tool of tools) {
    console.log(`- ${tool.name}`);
  }

  console.log(`\nTotal tools: ${tools.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
