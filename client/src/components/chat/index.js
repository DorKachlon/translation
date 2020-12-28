import React from "react";
import "./style.css";
export default function Chat({ historyConversation }) {
  const demo = [
    { status: "exercise", text: "the word apple is it hh" },
    { status: "answer", text: "qui" },
  ];

  return (
    <div className="chat">
      {historyConversation &&
        historyConversation.map((message) => (
          <div className={message.status === "answer" ? "answer message " : "exercise message "}>
            {message.text}
          </div>
        ))}
    </div>
  );
}
