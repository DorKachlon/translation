import React from "react";
import "./style.css";
export default function Chat({ historyConversation }) {
  return (
    <div className="chat">
      {historyConversation &&
        historyConversation.map((message, i) => (
          <div
            className={message.status === "answer" ? "answer message " : "exercise message "}
            key={i}
          >
            {message.textsAndSignificance.map((contact, i) => (
              <span className={contact.significance === "word" ? "bold" : ""} key={i}>
                {contact.text}
              </span>
            ))}
          </div>
        ))}
    </div>
  );
}
