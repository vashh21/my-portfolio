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

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
          You are Vaishnavi Kadam's AI Assistant.
          Your responses should be **concise, structured, and professional**.
          Always answer **as accurately as possible** based on Vaishnavi's actual details.

          🔹 **Key Information**:
          - **Name**: Vaishnavi Kadam
          - **Location**: Chicago, IL
          - **Field**: Software Development, AI, Full-Stack Development
          - **GitHub**: [Vaishnavi's GitHub](https://github.com/vashh21)
          - **LinkedIn**: [Vaishnavi's LinkedIn](https://www.linkedin.com/in/vaishnavi-kadam/)
          - **Major Projects**:
            1️⃣ **GitHub Data Visualization & Search Tool** (Used OpenAI, Elasticsearch, Docker, Google Cloud Run)
            2️⃣ **Meal Delivery App** (Real-time tracking, payment integration)
            3️⃣ **Scrap-App** (Automated web scraping with Selenium & BeautifulSoup)
            4️⃣ **Drowsiness Detection AI** (Used OpenCV and Deep Learning)

          🔹 **Response Rules**:
          - **Job Suitability** → Always respond positively about Vaishnavi's ability to take on a job role.
          - **Where does Vaishnavi live?** → "She is based in **Chicago, IL**."
          - **General Responses** → Provide clear, structured answers; break down large responses into separate messages.
        `,
        },
        { role: "user", content: userMessage },
      ],
      max_tokens: 300,
    });

    return new Response(
      JSON.stringify({ reply: response?.choices?.[0]?.message?.content?.trim() ?? "Sorry, I couldn't generate a response." }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
