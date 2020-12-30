import React from "react";
import "./style.css";
export default function Chat({ historyConversation }) {
  return (
    <div className="chat">
      {historyConversation &&
        historyConversation.map((message) => (
          <div className={message.status === "answer" ? "answer message " : "exercise message "}>
            {message.textsAndSignificance.map((contact) => (
              <span className={contact.significance === "word" ? "bold" : ""}>{contact.text}</span>
            ))}
          </div>
        ))}
    </div>
  );
}
