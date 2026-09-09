import { HumanMessage } from '@langchain/core/messages';

import { createDevelopmentAgent } from '../agentic/agent';

let agent: Awaited<ReturnType<typeof createDevelopmentAgent>> | undefined;

async function getAgent() {
  if (!agent) {
    agent = await createDevelopmentAgent();
  }

  return agent;
}

export async function chat(message: string): Promise<string> {
  const developmentAgent = await getAgent();

  const result = await developmentAgent.invoke({
    messages: [
      new HumanMessage({
        content: message,
      }),
    ],
  });

  const lastMessage = result.messages.at(-1);

  if (!lastMessage) {
    return 'The agent returned no response.';
  }

  return typeof lastMessage.content === 'string'
    ? lastMessage.content
    : JSON.stringify(lastMessage.content);
}
