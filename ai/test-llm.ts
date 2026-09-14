import { llm } from './llm';

async function main() {
  const response = await llm.invoke(
    'You are a QA automation engineer. Explain in one sentence what Playwright is.',
  );

  console.log(response.content);
}

main().catch((error) => {
  console.error('LLM test failed:', error);
  process.exit(1);
});
