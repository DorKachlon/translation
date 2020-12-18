import React, { useState, useEffect } from "react";
import Selector from "./Selector";
import { sortArray, filterArray } from "./helpersFunctions";
import axios from "axios";

export default function Dashboard2() {
  const [beDisabled, SetBeDisabled] = useState(true);
  const [languagesArr, setLanguagesArr] = useState([]);
  const [nativeLanguage, setNativeLanguage] = useState();
  const [learningLanguage, setLearningLanguage] = useState();

  console.log(nativeLanguage);
  useEffect(() => {
    (async () => {
      try {
        const { data: languages } = await axios.get("/api/v1/languages");
        setLanguagesArr(sortArray(languages));
        const { data: userInfo } = await axios.get("/api/v1/users/languages");
        setNativeLanguage(userInfo.nativeLanguage);
        setLearningLanguage(userInfo.currentLanguage);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div>
      {nativeLanguage && learningLanguage && (
        <>
          <Selector
            mode="native"
            label="Choose your native language"
            languagesArr={languagesArr}
            setYourChoice={setNativeLanguage}
            defaultV={nativeLanguage}
          />
          <Selector
            mode="learning"
            label="Choose language to learn"
            languagesArr={nativeLanguage ? filterArray(languagesArr, nativeLanguage) : []}
            setYourChoice={setLearningLanguage}
            defaultV={learningLanguage}
          />
        </>
      )}
    </div>
  );
}
