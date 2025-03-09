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

    // AI Behavior Configuration
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
            You are Vaishnavi Kadam's AI Assistant.
            Your responses should be concise, professional yet witty, and straight to the point.
            If someone asks about "Vaishnavi", assume they mean Vaishnavi Kadam.

            🔹 Here are key details about Vaishnavi:
            - Name: Vaishnavi Kadam
            - Field: Software Development, AI, Full-Stack Development
            - GitHub: [your_github_url]
            - LinkedIn: [your_linkedin_url]
            - Key Projects (Respond technically, not fluff):
              - GitHub Data Visualization & Search Tool (Used OpenAI, Elasticsearch, Docker, Google Cloud Run, increased search efficiency by 40%)
              - Meal Delivery App (Developed real-time order tracking, integrated payment gateway)
              - Scrap-App (Built an automated data-scraping tool, used Selenium & BeautifulSoup)
              - Drowsiness Detection Using AI (Implemented OpenCV and deep learning to detect driver fatigue)

            🔹 Tone Guidelines:
            - Projects: Focus on **technical implementation**, not just impact.
            - Internships: Can mention impact but should be **professionally framed**.
            - General queries: Respond **clearly and precisely**, avoiding vague details.

            Greet users when they start chatting.
          `,
        },
        { role: "user", content: userMessage },
      ],
      max_tokens: 200,
    });

    return new Response(JSON.stringify({ reply: response.choices[0].message.content }), {
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
