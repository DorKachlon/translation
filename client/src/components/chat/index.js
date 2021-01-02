import React, { useContext } from "react";
import "./style.css";
import { UserLanguages } from "../../context/UserLanguages";
export default function Chat({ historyConversation }) {
  const UserLanguagesContext = useContext(UserLanguages);
  return (
    <div className="chat">
      {historyConversation &&
        historyConversation.map((message, i) => (
          <div
            className={message.status === "answer" ? "answer message " : "exercise message "}
            key={i}
            style={{ direction: UserLanguagesContext.nativeLanguage.direction }}
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
