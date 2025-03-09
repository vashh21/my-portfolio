"use client";

import { Bot, XCircle } from "lucide-react";
import { useState } from "react";
import AIChatBox from "./AIChatBox";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setChatBoxOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 bg-purple-600 text-white rounded-full p-3 shadow-lg hover:scale-105"
      >
        {chatBoxOpen ? <XCircle size={20} /> : <Bot size={20} />}
      </button>
      {chatBoxOpen && <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />}
    </>
  );
}
