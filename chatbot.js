document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");
    const chatStatus = document.getElementById("chatStatus");

    if (!chatForm || !chatInput || !chatMessages) {
        console.error("Chatbot elements not found.");
        return;
    }

    function addMessage(text, type) {
        const message = document.createElement("div");
        message.className = type === "user" ? "user-message" : "bot-message";

        const p = document.createElement("p");
        p.textContent = text;

        message.appendChild(p);
        chatMessages.appendChild(message);

        chatMessages.scrollTop = chatMessages.scrollHeight;

        return message;
    }

    function addLoadingMessage() {
        const message = document.createElement("div");
        message.className = "bot-message loading-message";
        message.textContent = "Thinking...";
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return message;
    }

    async function sendMessage(event) {
        event.preventDefault();

        const message = chatInput.value.trim();

        if (!message) {
            return;
        }

        // Show user's message
        addMessage(message, "user");

        // Clear input
        chatInput.value = "";

        // Disable while waiting
        chatInput.disabled = true;

        const sendButton = document.getElementById("chatSend");
        if (sendButton) {
            sendButton.disabled = true;
        }

        if (chatStatus) {
            chatStatus.textContent = "Connecting to AI...";
        }

        const loadingMessage = addLoadingMessage();

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message
                })
            });

            const data = await response.json();

            // Remove "Thinking..."
            loadingMessage.remove();

            if (!response.ok) {
                throw new Error(
                    data.error || `Server error: ${response.status}`
                );
            }

            // Accept common response names
            const answer =
                data.answer ||
                data.response ||
                data.message ||
                data.reply;

            if (!answer) {
                throw new Error("AI returned an empty response.");
            }

            addMessage(answer, "bot");

            if (chatStatus) {
                chatStatus.textContent = "Connected";
            }

        } catch (error) {
            console.error("Chatbot error:", error);

            loadingMessage.remove();

            addMessage(
                "Sorry, I couldn't connect to the AI. Please try again.",
                "bot"
            );

            if (chatStatus) {
                chatStatus.textContent = "Connection failed";
            }
        } finally {
            chatInput.disabled = false;

            if (sendButton) {
                sendButton.disabled = false;
            }

            chatInput.focus();
        }
    }

    chatForm.addEventListener("submit", sendMessage);
});