import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { chat } from './chat';

async function main() {
  const rl = readline.createInterface({
    input,
    output,
  });

  console.log('\nPlaywright Agentic Development Assistant');
  console.log('Type "exit" or "quit" to leave.\n');

  try {
    while (true) {
      const message = await rl.question('You: ');

      const trimmed = message.trim();

      if (!trimmed) {
        continue;
      }

      if (trimmed.toLowerCase() === 'exit' || trimmed.toLowerCase() === 'quit') {
        break;
      }

      try {
        console.log('\nAgent:\n');

        const response = await chat(trimmed);

        console.log(response);
        console.log();
      } catch (error) {
        console.error('\nAgent error:', error instanceof Error ? error.message : error);
      }
    }
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
