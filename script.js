// ===============================
// AI PORTFOLIO CHATBOT
// ===============================

function getBotResponse(message) {
  const text = message.toLowerCase().trim();

  // Greeting
  if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
  ) {
      return "Hello! I'm Lavish's portfolio assistant. You can ask me about his skills, projects, education, Python, AI, or portfolio.";
  }

  // Skills
  if (
      text.includes("skill") ||
      text.includes("skills") ||
      text.includes("technology") ||
      text.includes("technologies")
  ) {
      return "Lavish is developing skills in Python, JavaScript, Machine Learning, Data Analysis, Artificial Intelligence, and core programming concepts.";
  }

  // Projects
  if (
      text.includes("project") ||
      text.includes("projects")
  ) {
      return "Lavish has worked on projects including an Interactive Quiz Application, Book Reading List Application, Python practice projects, and bug-fixing projects.";
  }

  // Education
  if (
      text.includes("education") ||
      text.includes("college") ||
      text.includes("degree")
  ) {
      return "Lavish is pursuing a B.Tech in Artificial Intelligence and Data Science.";
  }

  // Python
  if (
      text.includes("python")
  ) {
      return "Lavish uses Python for programming practice, data analysis, and learning Artificial Intelligence and Machine Learning concepts.";
  }

  // AI
  if (
      text.includes("ai") ||
      text.includes("artificial intelligence") ||
      text.includes("machine learning")
  ) {
      return "Lavish is interested in Artificial Intelligence and Machine Learning, especially using technology and data to solve real-world problems.";
  }

  // Portfolio
  if (
      text.includes("portfolio") ||
      text.includes("about you") ||
      text.includes("about lavish")
  ) {
      return "This is Lavish Sharma's personal portfolio, showcasing his education, skills, projects, and interests in Artificial Intelligence and Data Science.";
  }

  // Contact
  if (
      text.includes("contact") ||
      text.includes("email") ||
      text.includes("reach")
  ) {
      return "You can use the Contact section of the portfolio to connect with Lavish.";
  }

  // Default answer
  return "I can help you with information about Lavish's skills, projects, education, Python experience, AI interests, and portfolio. Try asking about his projects or skills.";
}


// ===============================
// SEND MESSAGE
// ===============================

async function sendMessage() {
  const message = chatInput.value.trim();

  if (!message) return;

  // Show user's message
  chatMessages.innerHTML += `
      <div class="user-message">${message}</div>
  `;

  // Clear input
  chatInput.value = "";

  // Show temporary response
  const loading = document.createElement("div");
  loading.className = "bot-message";
  loading.textContent = "Thinking...";
  chatMessages.appendChild(loading);

  // Small delay to make chatbot feel natural
  setTimeout(() => {
      const reply = getBotResponse(message);

      // Remove "Thinking..."
      loading.remove();

      // Show bot response
      const botMessage = document.createElement("div");
      botMessage.className = "bot-message";
      botMessage.textContent = reply;

      chatMessages.appendChild(botMessage);

      // Scroll to latest message
      chatMessages.scrollTop = chatMessages.scrollHeight;

  }, 500);
}