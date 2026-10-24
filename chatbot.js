// ================= AI PORTFOLIO CHATBOT =================

const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const chatSend = document.getElementById("chatSend");
const chatStatus = document.getElementById("chatStatus");

// Portfolio information for the AI
const portfolioContext = `
You are Lavish Sharma's portfolio AI assistant.

Answer questions about Lavish Sharma and his portfolio.

Portfolio information:
- Lavish Sharma is a B.Tech student specializing in Artificial Intelligence and Data Science.
- His interests include Artificial Intelligence, Data Science, Python, Machine Learning, Data Analysis and Software Development.
- His portfolio projects include:
  1. Python Programs Collection
  2. Messy Python Code Improvement
  3. Bug Fixing Using Cursor AI
  4. Interactive Quiz Application
  5. Book Reading List Application

Only claim information that is provided in this portfolio context.
If the user asks something that is not related to the portfolio, politely say that you can mainly answer questions about Lavish's portfolio, skills and projects.
Keep answers concise and friendly.
`;

function addMessage(text, className) {
    const message = document.createElement("div");
    message.className = className;
    message.textContent = text;

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage(event) {
    event.preventDefault();

    const message = chatInput.value.trim();

    if (!message) {
        return;
    }

    // Show user's message
    addMessage(message, "user-message");

    // Clear input
    chatInput.value = "";

    // Disable button while waiting
    chatSend.disabled = true;
    chatStatus.textContent = "AI is thinking...";

    try {
        const response = await fetch(
            `${CONFIG.baseUrl}/chat/completions`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${CONFIG.apiKey}`
                },

                body: JSON.stringify({
                    model: CONFIG.model,

                    messages: [
                        {
                            role: "system",
                            content: portfolioContext
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ],

                    temperature: 0.7,
                    max_tokens: 300
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Groq API error:", data);

            throw new Error(
                data.error?.message || "API request failed"
            );
        }

        const answer =
            data.choices?.[0]?.message?.content;

        if (!answer) {
            throw new Error("No response received from AI.");
        }

        addMessage(answer, "bot-message");

        chatStatus.textContent = "";

    } catch (error) {
        console.error("Chatbot error:", error);
    
        addMessage(
            "Error: " + error.message,
            "bot-message"
        );
    
        chatStatus.textContent = "Check the browser console.";
    }finally {

        chatSend.disabled = false;
        chatInput.focus();
    }
}

chatForm.addEventListener("submit", sendMessage);