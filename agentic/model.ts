import 'dotenv/config';

import { ChatOpenAI } from '@langchain/openai';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OPENAI_API_KEY is not set. Add it to your .env file.');
}

export const model = new ChatOpenAI({
  model: process.env.OPENAI_MODEL ?? 'gpt-5-mini',
  temperature: 0,
  maxRetries: 2,
});
