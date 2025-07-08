import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaRobot, FaEllipsisH } from "react-icons/fa";

const API_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = "AIzaSyBUDb5uOKoavpI1CZG9kA9jdImwWchirIA";

export default function App() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I'm your AI assistant. How may I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_ENDPOINT}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }],
        }),
      });

      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I didn’t get that.";

      const newAiMessage = { role: "ai", text: reply };
      setMessages((prev) => [...prev, newAiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error connecting to AI." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Heading */}
      <header className="bg-blue-900 text-white py-3 px-5 flex items-center justify-center shadow-md gap-2">
        <FaRobot className="w-6 h-6 text-white" />
        <h1 className="text-xl font-semibold">My AI Chat Bot</h1>
      </header>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex items-end gap-2 max-w-sm ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div className="bg-blue-200 text-black px-4 py-2 rounded-2xl">
                {msg.text}
              </div>
              <div className="bg-blue-500 rounded-full p-1">
                {msg.role === "user" ? (
                  <FaUser className="text-white w-4 h-4" />
                ) : (
                  <FaRobot className="text-white w-4 h-4" />
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 max-w-sm">
              <div className="bg-blue-200 text-black px-4 py-2 rounded-2xl flex items-center gap-2">
                <FaEllipsisH className="animate-pulse" />
              </div>
              <div className="bg-blue-500 rounded-full p-1">
                <FaRobot className="text-white w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        <div ref={chatRef}></div>
      </div>

      {/* Textarea Input */}
      <div className="bg-blue-900 p-4 flex items-end gap-3">
        <textarea
          ref={textareaRef}
          rows={1}
          className="flex-grow resize-none overflow-hidden bg-white text-black border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        ></textarea>
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
