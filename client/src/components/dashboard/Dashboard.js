import React, { useState, useEffect } from "react";
import Selector from "./Selector";
import { sortArray, filterArray } from "./helpersFunctions";
import network from "../../services/network";

export default function Dashboard({ nativeLanguage, setNativeLanguage, setLearningLanguage }) {
  const [beDisabled, SetBeDisabled] = useState(true);
  const [languagesArr, setLanguagesArr] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data: languages } = await network.get("/api/v1/languages");
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
