"use client";

import { useState, useEffect, useRef } from "react";
import { SendHorizontal, Trash, XCircle } from "lucide-react";

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: "Hey! Need insights on my work? Ask away!" }]);
    }
  }, [open]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      const botReply: string = data.reply?.trim() ?? "";
      const splitMessages = botReply.split("\n\n");

      splitMessages.forEach((msg: string) => {
        const cleaned = msg.replace(/\*\*/g, "").replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-500 underline" target="_blank">$1</a>');
        setMessages((prev) => [...prev, { role: "assistant", content: cleaned }]);
      });
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
    <div
      className={`fixed bottom-16 right-4 z-50 w-full max-w-[450px] p-3 ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col h-[550px] rounded-lg shadow-lg border overflow-hidden bg-white dark:bg-[#111827]">
        <div className="flex items-center justify-between bg-purple-600 text-white p-4">
          <h2 className="font-bold text-sm">Vaishnavi&apos;s AI Assistant</h2>
          <button onClick={onClose} className="hover:text-gray-300 transition">
            <XCircle size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 text-sm" ref={scrollRef}>
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
          <button
            type="button"
            className="w-8 hover:text-red-500"
            title="Clear chat"
            onClick={() => setMessages([])}
          >
            <Trash size={20} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about Vaishnavi..."
            className="flex-grow rounded-full border px-3 py-1 focus:ring-2 focus:ring-purple-500 text-sm bg-white dark:bg-black text-black dark:text-white"
          />
          <button type="submit" className="w-8 disabled:opacity-50 hover:text-blue-400" disabled={input.length === 0}>
            <SendHorizontal size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({ message }: { message: ChatMessage }) {
  return (
    <div className={`mb-2 flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
      <div
        className={`rounded-lg px-3 py-2 text-sm max-w-[75%] prose dark:prose-invert ${
          message.role === "assistant"
            ? "bg-white text-gray-800 shadow-md dark:bg-gray-800 dark:text-gray-100"
            : "bg-blue-500 text-white shadow-md"
        }`}
        dangerouslySetInnerHTML={{ __html: message.content }}
      />
    </div>
  );
}
