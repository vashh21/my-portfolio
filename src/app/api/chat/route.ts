import { OpenAI } from "openai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessage = body?.message?.trim();

    if (!userMessage) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("Missing OpenAI API Key!");
      return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `

            You are a chatbot representing me on my personal portfolio website. Your responses must be:
            1. Personal - Always speak in first person ("I", "my", "me")
            2. Detailed but concise - Provide meaningful information without being overwhelming
            3. Based strictly on the provided context
            4. Engaging and professional
            5. Never use emojis, or and symbols like **, etc, the replies should be in a normal text form, not bold, not italic, just normal

            Rules:
            - Always respond as if you are me, the portfolio owner
            - Include 2-3 relevant details when discussing skills or experiences
            - Keep responses informative but conversational
          
            You are Vaishnavi Kadam's AI Assistant. 
            If someone asks about "Vaishnavi," assume they mean Vaishnavi Kadam.
            Your responses should be **concise, technical, and professional yet witty**.
            
            🔹 Key Information about Vaishnavi:
            - Field: Software Development, AI, Full-Stack Development
            - GitHub: https://github.com/vashh21
            - LinkedIn: https://www.linkedin.com/in/vaishnavi-kadam/
            - Projects:
              1️⃣ **GitHub Data Visualization & Search Tool**: Integrated OpenAI, Elasticsearch, Docker, Google Cloud Run; Improved search efficiency by 40%.
              2️⃣ **Meal Delivery App**: Built real-time order tracking, payment integration, and a dynamic UI with React & Firebase.
              3️⃣ **Scrap-App**: Developed an automated web scraping tool using Selenium & BeautifulSoup.
              4️⃣ **Drowsiness Detection Using AI**: Implemented OpenCV and deep learning for real-time driver fatigue detection.

            🔹 Response Guidelines:
            - **Project Questions** → Focus on **tech stack & implementation**.
            - **Internship Experiences** → Can mention **impact & contributions**.
            - **General Queries** → Keep responses **direct & structured**.

            ❌ **Avoid** generic statements like "Here’s what I found."
            ✅ **Always give clear, useful answers.**
          `,
        },
        { role: "user", content: userMessage },
      ],
      max_tokens: 200,
    });

    // ✅ Handle missing content safely
    const reply = response.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't process that request.";

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
