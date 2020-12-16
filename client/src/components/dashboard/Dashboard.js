import React, { useState, useEffect } from "react";
import Selector from "./Selector";
import { sortArray, filterArray } from "./helpersFunctions";

export default function Dashboard() {
  const [beDisabled, SetBeDisabled] = useState(true);
  const [languagesArr, setLanguagesArr] = useState([]);
  const [nativeLanguage, setNativeLanguage] = useState();
  const [learningLanguage, setLearningLanguage] = useState();

  useEffect(() => {
    setLanguagesArr(sortArray(languages));
  }, []);

  useEffect(() => {
    if (nativeLanguage) {
      SetBeDisabled(false);
    }
  }, [nativeLanguage]);
  return (
    <div>
      <Selector
        label="Choose your native language"
        languagesArr={languagesArr}
        setYourChoice={setNativeLanguage}
      />
      <Selector
        label="Choose language to learn"
        languagesArr={nativeLanguage && filterArray(languagesArr, nativeLanguage)}
        beDisabled={beDisabled}
        setYourChoice={setLearningLanguage}
      />
    </div>
  );
}

const languages = [
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
