import { ChatOpenAI } from '@langchain/openai';

export const llm = new ChatOpenAI({
  model: 'gpt-5-mini',
  temperature: 0,
});
