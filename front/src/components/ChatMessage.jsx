import React, { useEffect, useRef, useState } from "react";
import "../styles/styles.module.css"; 
import ChatMessage from "./ChatMessage";

function Chat() {
  const [messages, setMessages] = useState([
    { message: "Bonjour, je suis ton assistant IA !", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { message: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3.3-8b-instruct:free",
            messages: [{ role: "user", content: input }],
          }),
        }
      );

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "[Pas de réponse]";

      const botMessage = { message: reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { message: "Erreur lors de la requête à l'API", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="app-wrapper">
      <div className="chat-container">
        <header className="chat-header">Mon Assistant IA</header>
        <main className="chat-main">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.message} sender={msg.sender} />
          ))}
          {loading && <p className="bot-typing">L'assistant réfléchit...</p>}
          <div ref={bottomRef} />
        </main>
        <footer className="chat-footer">
          <div className="input-container">
            <input
              className="chat-input"
              placeholder="Écris un message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading}
            />
            <button
              className="send-button"
              onClick={handleSend}
              disabled={loading}
            >
              {loading ? "..." : "Envoyer"}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Chat;