import React, { useState, useEffect } from "react";
import Selector from "./Selector";
import { sortArray, filterArray } from "./helpersFunctions";
import axios from "axios";

export default function Dashboard() {
  const [beDisabled, SetBeDisabled] = useState(true);
  const [languagesArr, setLanguagesArr] = useState([]);
  const [nativeLanguage, setNativeLanguage] = useState();
  const [learningLanguage, setLearningLanguage] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { data: languages } = await axios.get("/api/v1/languages");
        setLanguagesArr(sortArray(languages));
      } catch (e) {
        console.error(e);
      }
    })();
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
        registrestion={true}
      />
      <Selector
        label="Choose language to learn"
        languagesArr={nativeLanguage ? filterArray(languagesArr, nativeLanguage) : []}
        beDisabled={beDisabled}
        setYourChoice={setLearningLanguage}
        registrestion={true}
      />
    </div>
  );
}
