import React, { useState } from "react";
import Selector from "./Selector";
export default function Dashboard() {
  const [beDisabled, SetBeDisabled] = useState();

  return (
    <div>
      <Selector label="Choose your native language" languagesArr={languagesArr} />
      <Selector label="Choose language to learn" languagesArr={languagesArr} beDisabled={false} />
    </div>
  );
}

const languagesArr = [
  { code: "en-US", label: "English" },
  { code: "es-ES", label: "Spanish" },
  { code: "ja-JP", label: "Japanese" },
  { code: "ru-RU", label: "Russian" },
  { code: "sv-SE", label: "Swedish" },
  { code: "it-IT", label: "Italian" },
  { code: "fr-FR", label: "French" },
  { code: "pt-BR", label: "Portuguese" },
  { code: "de-DE", label: "German" },
  { code: "ar-JO", label: "Arabic" },
  { code: "am-ET", label: "Amharic " },
  { code: "hi-IN", label: "Hindi" },
  { code: "iw-IL", label: "Hebrew" },
];
