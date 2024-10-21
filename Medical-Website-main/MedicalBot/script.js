const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector("#send-btn");

let userMessage = null; // To store the user's message

// Function to create chat messages (both incoming and outgoing)
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className); // Adds the class (either incoming or outgoing)
  
  let chatContent = className === "outgoing" 
    ? `<p>${message}</p>` // Outgoing message
    : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`; // Incoming bot message

  chatLi.innerHTML = chatContent;
  return chatLi;
}

// Function to handle sending user messages
const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user input and trim any extra spaces
  if (!userMessage) return; // Don't send empty messages
  
  // Create and display the outgoing user message
  const userChatLi = createChatLi(userMessage, "outgoing");
  chatbox.appendChild(userChatLi);
  chatbox.scrollTo(0, chatbox.scrollHeight); // Scroll chatbox to bottom
  
  // Clear the input box after sending a message
  chatInput.value = "";

  // Simulate bot response after a short delay
  setTimeout(() => {
    const botMessage = generateBotResponse(userMessage);
    const botChatLi = createChatLi(botMessage, "incoming");
    chatbox.appendChild(botChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight); // Scroll to bottom again for the bot's message
  }, 1000); // Simulate a delay of 1 second for the bot response
}

// Function to generate simple bot responses
const generateBotResponse = (userMessage) => {
  // You can expand this logic to call an actual API or have more advanced responses
  const responses = {
    "hello": "Hi! How can I assist you today?",
    "how are you": "I'm just a bot, but I'm doing great! How about you?",
    "what can you do": "I can answer your questions, chat with you, and more.",
    "bye": "Goodbye! Feel free to return if you need anything."
  };

  // Check if the bot has a predefined response, otherwise return a default message
  return responses[userMessage.toLowerCase()] || "I'm sorry, I didn't understand that. Could you try again?";
}

// Toggle chatbot visibility
chatbotToggler.addEventListener("click", () => {
  document.body.classList.toggle("show-chatbot");
});

// Close chatbot
closeBtn.addEventListener("click", () => {
  document.body.classList.remove("show-chatbot");
});

// Send message when clicking the send button
sendChatBtn.addEventListener("click", handleChat);

// Send message when pressing the Enter key (but not Shift+Enter for new line)
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // Prevent new line from being added
    handleChat();
  }
});
