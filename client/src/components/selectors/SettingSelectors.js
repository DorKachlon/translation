import React, { useState, useEffect } from "react";
import Selector from "./Selector";
import { sortArray, filterArray } from "./helpersFunctions";
import network from "../../services/network";
import "./style.css";
export default function SettingSelectors({ setLoading }) {
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
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <>
      {nativeLanguage && learningLanguage && (
        <>
          <div className="setting-selectors-container">
            <div className="setting-selectors-title">Native Language:</div>
            <Selector
              mode="native"
              label="Choose your native language"
              languagesArr={languagesArr}
              setYourChoice={setNativeLanguage}
              defaultV={nativeLanguage}
            />
          </div>
          <div className="setting-selectors-container">
            <div className="setting-selectors-title">Language To Learn:</div>
            <Selector
              mode="learning"
              label="Choose language to learn"
              languagesArr={nativeLanguage ? filterArray(languagesArr, nativeLanguage) : []}
              setYourChoice={setLearningLanguage}
              defaultV={learningLanguage}
            />
          </div>
        </>
      )}
    </>
  );
}
