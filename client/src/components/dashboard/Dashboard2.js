import React, { useState, useEffect } from "react";
import Selector from "./Selector";
import { sortArray, filterArray } from "./helpersFunctions";
import network from "../../services/network";

export default function Dashboard2() {
  const [languagesArr, setLanguagesArr] = useState([]);
  const [nativeLanguage, setNativeLanguage] = useState();
  const [learningLanguage, setLearningLanguage] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { data: languages } = await network.get("/api/v1/languages");
        setLanguagesArr(sortArray(languages));
        const { data: userInfo } = await network.get("/api/v1/users/languages");
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
