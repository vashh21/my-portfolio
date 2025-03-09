import { useState, useEffect, useRef } from "react";
import { Bot, SendHorizontal, Trash, XCircle } from "lucide-react";

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // ✅ Auto-welcome message when chatbot opens
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { role: "assistant", content: "Hey! Need insights on my work? Ask away!" },
      ]);
    }
  }, [open]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // ✅ Ensuring user message gets stored
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const botReply = data.reply.trim(); // ✅ Ensuring AI response is trimmed properly

      if (!botReply || botReply.endsWith("?")) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: "Here’s what I found: " + botReply }, // ✅ Forces AI to give actual content
        ]);
      } else {
        setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: botReply }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Something went wrong. Try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-16 right-4 z-50 w-full max-w-[450px] p-3 ${open ? "block" : "hidden"}`}>
      <div className="flex h-[550px] flex-col border bg-background shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center justify-between bg-gray-800 p-4 text-white">
          <h2 className="font-bold text-sm">Vaishnavi&apos;s AI Assistant</h2>
          <button onClick={onClose} className="hover:text-gray-300 transition">
            <XCircle size={20} />
          </button>
        </div>

        <div className="mt-3 h-full overflow-y-auto px-3 text-sm" ref={scrollRef}>
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}

          {isLoading && (
            <div className="flex items-center justify-center p-3">
              <span className="animate-spin border-2 border-gray-300 h-4 w-4 rounded-full"></span>
              <span className="ml-2 text-gray-500">Thinking...</span>
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} className="m-3 flex gap-1">
          <button type="button" className="w-8 hover:text-red-500" title="Clear chat" onClick={() => setMessages([])}>
            <Trash size={20} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about Vaishnavi..."
            className="flex-grow rounded-full border px-3 py-1 focus:ring-2 focus:ring-purple-500 text-sm"
          />
          <button type="submit" className="w-8 disabled:opacity-50 hover:text-blue-400" disabled={input.length === 0}>
            <SendHorizontal size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

// ✅ Chat Message Component (Handles AI & User Messages)
function ChatMessage({ message }: { message: { role: string; content: string } }) {
  return (
    <div className={`mb-2 flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
      {message.role === "assistant" && <Bot className="mr-2 flex-none" />}
      <div className="rounded-md border px-3 py-1 bg-gray-700 text-white text-sm">{message.content}</div>
    </div>
  );
}
