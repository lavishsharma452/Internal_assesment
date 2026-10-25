export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-20b",

                    messages: [
                        {
                            role: "system",
                            content:
                                "You are the AI assistant for Lavish Sharma's portfolio. Answer questions about his education, skills, projects, and portfolio. Use only the information provided by the portfolio context. Do not invent information."
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
            return res.status(response.status).json({
                error: data.error?.message || "Groq API request failed"
            });
        }

        return res.status(200).json({
            answer: data.choices[0].message.content
        });

    } catch (error) {
        console.error("Server error:", error);

        return res.status(500).json({
            error: "Unable to connect to AI service"
        });
    }
}