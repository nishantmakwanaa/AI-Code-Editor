console.log("Chatbot module has been loaded.");

const generalResponses = [
  "Hi there! How can I be of service today?",
  "Hello! What would you like to chat about?",
  "Hi, there! Hows your day is going?",
];

const positiveResponses = [
  "I'm glad I could help! Is there anything else I can assist you with?",
  "You're welcome! Let me know if you have any other questions.",
  "Sounds good! Let me know if you have any other questions.",
];

const neutralResponses = [
  "Interesting! Tell me more about that.",
  "That sounds like a good plan. Anything I can do to assist?",
  "I'm not sure I understand. Could you rephrase that?",
];

const apologyResponses = [
  "I apologize, I don't seem to understand. Could you rephrase that?",
  "Hmm, I'm still under development and learning. Can you try asking in a different way?",
  "I'm sorry, I don't understand. Could you rephrase that?",
];

const informativeResponses = [
  "Here are some resources that might be helpful: [link to relevant information].",
  "Current events are quite interesting! Did you hear about [insert topic]?",
  "I'm not sure I understand. Could you rephrase that?",
];

const engagingQuestions = [
  "What are your plans for today?",
  "If you could have any superpower, what would it be?",
  "What are your plans for tomorrow?",
  "What are your plans for the day after tomorrow?",
  "What are your plans for the week after tomorrow?",
  "What are your plans for the month after tomorrow?",
  "What are your plans for the year after tomorrow?",
];

const humorousResponses = [
  "Is that all you've got? I can handle tougher questions!",
  "I'm not sure I understand. Could you rephrase that?",
];

const allResponses = [
  ...generalResponses,
  ...positiveResponses,
  ...neutralResponses,
  ...apologyResponses,
  ...informativeResponses,
  ...engagingQuestions,
  ...humorousResponses,
];

const getRandomResponse = () => {
  const randomIndex = Math.floor(Math.random() * allResponses.length);
  return allResponses[randomIndex];
};

const getOllamaResponse = (message) => {
  console.log(
    "getOllamaResponse function was called with message:",
    message.toLowerCase()
  );

  const lowerCaseMessage = message.toLowerCase();

  const specificResponses = {
    "good morning": "Good morning! ☀️ How can I help you get started?",
    "good afternoon": "Good afternoon! ☀️ How can I help you get started?",
    "good evening": "Good evening! ☀️ How can I help you get started?",
    "good night": "Good night! ☀️ How can I help you get started?",
    hello: "Hello! How can I help you today?",
    "how are you": "I am just a bot, but I am here to help you!",
    "good night": "OGood night! Have a great sleep!",
    "how are you": "I am just a bot, but I am here to help you!",
    "good night": "OGood night! Have a great sleep!",
    "good night": "OGood night! Have a great sleep!",
  };

  if (specificResponses[lowerCaseMessage]) {
    return specificResponses[lowerCaseMessage];
  } else {
    const potentialIntents = {
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

module.exports = {
  getOllamaResponse,
};