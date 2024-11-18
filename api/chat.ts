import type { VercelRequest, VercelResponse } from '@vercel/node';

console.log("Chatbot Module Has Been Loaded...");

const generalResponses: string[] = [
  "Hi there! How can I be of service today?",
  "Hello! What would you like to chat about?",
  "Hi, there! How's your day going?",
];

const positiveResponses: string[] = [
  "I'm glad I could help! Is there anything else I can assist you with?",
  "You're welcome! Let me know if you have any other questions.",
  "Sounds good! Let me know if you have any other questions.",
];

const neutralResponses: string[] = [
  "Interesting! Tell me more about that.",
  "That sounds like a good plan. Anything I can do to assist?",
  "I'm not sure I understand. Could you rephrase that?",
];

const apologyResponses: string[] = [
  "I apologize, I don't seem to understand. Could you rephrase that?",
  "Hmm, I'm still under development and learning. Can you try asking in a different way?",
  "I'm sorry, I don't understand. Could you rephrase that?",
];

const informativeResponses: string[] = [
  "Here are some resources that might be helpful: [link to relevant information].",
  "Current events are quite interesting! Did you hear about [insert topic]?",
  "I'm not sure I understand. Could you rephrase that?",
];

const engagingQuestions: string[] = [
  "What are your plans for today?",
  "If you could have any superpower, what would it be?",
  "What are your plans for tomorrow?",
  "What are your plans for the day after tomorrow?",
  "What are your plans for the week after tomorrow?",
  "What are your plans for the month after tomorrow?",
  "What are your plans for the year after tomorrow?",
];

const humorousResponses: string[] = [
  "Is that all you've got? I can handle tougher questions!",
  "I'm not sure I understand. Could you rephrase that?",
];

const allResponses: string[] = [
  ...generalResponses,
  ...positiveResponses,
  ...neutralResponses,
  ...apologyResponses,
  ...informativeResponses,
  ...engagingQuestions,
  ...humorousResponses,
];

const getRandomResponse = (): string => {
  const randomIndex = Math.floor(Math.random() * allResponses.length);
  return allResponses[randomIndex];
};

type OllamaResponse = string;

const getOllamaResponse = (message: OllamaResponse): string => {
  console.log("getOllamaResponse function was called with message:", message.toLowerCase());

  const lowerCaseMessage = message.toLowerCase();

  const specificResponses: Record<string, string> = {
    "good morning": "Good morning! ☀️ How can I help you get started?",
    "good afternoon": "Good afternoon! ☀️ How can I help you get started?",
    "good evening": "Good evening! ☀️ How can I help you get started?",
    "good night": "Good night! ☀️ How can I help you get started?",
    hello: "Hello! How can I help you today?",
    "how are you": "I am just a bot, but I am here to help you!",
  };

  if (specificResponses[lowerCaseMessage]) {
    return specificResponses[lowerCaseMessage];
  } else {
    const potentialIntents: Record<string, string[]> = {
      informative: ["tell me about", "what is", "explain"],
      engaging: ["what do you think", "how about", "if you could"],
    };

    for (const intent in potentialIntents) {
      if (
        potentialIntents[intent].some((word) =>
          message.toLowerCase().includes(word)
        )
      ) {
        const categoryResponses = allResponses.filter((response) =>
          response.toLowerCase().includes(intent)
        );
        return categoryResponses[
          Math.floor(Math.random() * categoryResponses.length)
        ];
      }
    }

    return getRandomResponse();
  }
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  let message = '';

  if (req.query.message) {
    message = req.query.message as string;
  }

  else if (req.body && typeof req.body === 'object' && req.body.message) {
    message = req.body.message;
  }

  else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    message = req.body && req.body.message ? req.body.message : '';
  }

  const responseMessage = getOllamaResponse(message);
  return res.json({
    message: responseMessage,
  });
}
