document.addEventListener("DOMContentLoaded", function () {

    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");
    const chatStatus = document.getElementById("chatStatus");

    if (!chatForm || !chatInput || !chatMessages) {
        alert("Chatbot HTML elements were not found. Check chatForm, chatInput and chatMessages IDs.");
        return;
    }

    async function sendMessage(event) {
        event.preventDefault();

        const message = chatInput.value.trim();

        if (!message) {
            return;
        }

        // Show user's message
        const userMessage = document.createElement("div");
        userMessage.className = "user-message";
        userMessage.textContent = message;
        chatMessages.appendChild(userMessage);

        chatInput.value = "";

        if (chatStatus) {
            chatStatus.textContent = "Connecting to AI...";
        }

        // Loading message
        const loadingMessage = document.createElement("div");
        loadingMessage.className = "bot-message";
        loadingMessage.textContent = "Thinking...";
        chatMessages.appendChild(loadingMessage);

        try {

            // Check config.js
            if (typeof CONFIG === "undefined") {
                throw new Error(
                    "CONFIG is not defined. Check that config.js is loaded before chatbot.js."
                );
            }

            // Check API key
            if (!CONFIG.apiKey) {
                throw new Error(
                    "API key is missing in config.js."
                );
            }

            const response = await fetch(
                "https://api.groq.com/openai/v1/chat/completions",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + CONFIG.apiKey
                    },

                    body: JSON.stringify({
                        model: "openai/gpt-oss-20b",

                        messages: [
                            {
                                role: "system",
                                content:
                                    "You are Lavish Sharma's portfolio AI assistant. Answer questions about his skills, projects, education and portfolio. Do not invent information."
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

            loadingMessage.remove();

            if (!response.ok) {
                throw new Error(
                    "API Error " +
                    response.status +
                    ": " +
                    (data.error?.message || "Unknown API error")
                );
            }

            const answer = data.choices?.[0]?.message?.content;

            if (!answer) {
                throw new Error("AI returned an empty response.");
            }

            // Show AI response
            const botMessage = document.createElement("div");
            botMessage.className = "bot-message";
            botMessage.textContent = answer;

            chatMessages.appendChild(botMessage);

            if (chatStatus) {
                chatStatus.textContent = "Connected";
            }

        } catch (error) {

            console.error(error);

            loadingMessage.remove();

            const errorMessage = document.createElement("div");
            errorMessage.className = "bot-message";

            errorMessage.textContent =
                "DEBUG ERROR: " + error.message;

            chatMessages.appendChild(errorMessage);

            if (chatStatus) {
                chatStatus.textContent = "Connection failed";
            }
        }
    }

    chatForm.addEventListener("submit", sendMessage);

});