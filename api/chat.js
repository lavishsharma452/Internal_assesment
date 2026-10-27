// =========================================
// LAVISH SHARMA PORTFOLIO - GROQ CHATBOT
// =========================================

export default async function handler(req, res) {

    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const { message } = req.body || {};

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        // Check API key
        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({
                error: "GROQ_API_KEY is not configured on Vercel"
            });
        }

        // =========================================
        // PORTFOLIO INFORMATION
        // =========================================

        const portfolioContext = `
You are the official AI assistant for Lavish Sharma's personal portfolio.

IMPORTANT:
You must answer questions specifically about Lavish Sharma.
Do not confuse Lavish Sharma with another person.
Do not invent information that is not provided below.

PERSON:
Name: Lavish Sharma

EDUCATION:
Lavish Sharma is pursuing a B.Tech in Artificial Intelligence and Data Science.

INTERESTS:
- Artificial Intelligence
- Data Science
- Machine Learning
- Python
- Programming
- Web Development
- Data Analysis
- Technology

SKILLS:
- Python
- HTML
- CSS
- JavaScript
- NumPy
- Machine Learning basics
- Data Analysis
- Core programming concepts

PROJECTS:

1. Book Reading List
A simple application for managing and organizing books to read.
Technologies: HTML, CSS, JavaScript.

2. Bug Fixing
A project focused on identifying, debugging, and fixing programming issues.
Technologies: Programming and Debugging.

3. Messy Python
A collection of Python practice work focused on improving code structure and programming logic.
Technology: Python.

4. Python Program
A Python programming project created to practice programming concepts and problem solving.
Technology: Python.

5. Quiz Application
An interactive quiz application that allows users to answer questions and test their knowledge.
Technologies: HTML, CSS, JavaScript.

PORTFOLIO:
This portfolio showcases Lavish Sharma's education, skills, projects, and interests in Artificial Intelligence and Data Science.

RESPONSE RULES:
- Answer naturally and professionally.
- Keep answers reasonably short.
- If asked about Lavish's projects, mention the relevant projects above.
- If asked about Lavish's skills, use the skills listed above.
- If asked who you are, say you are Lavish Sharma's AI portfolio assistant.
- If asked something unrelated to Lavish's portfolio, politely say that you are designed mainly to answer questions about Lavish Sharma's portfolio.
- Never say that you do not have information about Lavish when the information is included above.
`;

        // =========================================
        // GROQ API REQUEST
        // =========================================

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization":
                        `Bearer ${process.env.GROQ_API_KEY}`
                },

                body: JSON.stringify({

                    // Current Groq-supported production model
                    model: "openai/gpt-oss-20b",

                    messages: [
                        {
                            role: "system",
                            content: portfolioContext
                        },
                        {
                            role: "user",
                            content: message.trim()
                        }
                    ],

                    temperature: 0.4,
                    max_completion_tokens: 500
                })
            }
        );

        const data = await response.json();

        // =========================================
        // HANDLE GROQ ERROR
        // =========================================

        if (!response.ok) {

            console.error("Groq API error:", data);

            return res.status(response.status).json({
                error:
                    data?.error?.message ||
                    "Groq API request failed"
            });
        }

        // =========================================
        // GET AI RESPONSE
        // =========================================

        const answer =
            data?.choices?.[0]?.message?.content;

        if (!answer) {

            return res.status(500).json({
                error: "AI returned an empty response"
            });
        }

        // =========================================
        // SEND RESPONSE TO FRONTEND
        // =========================================

        return res.status(200).json({
            answer: answer.trim()
        });

    } catch (error) {

        console.error("Chatbot server error:", error);

        return res.status(500).json({
            error: "Unable to connect to the AI service"
        });
    }
}