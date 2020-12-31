import React, { useEffect, useState } from "react";
import network from "../../services/network";
import "./style.css";
import Loading from "../Loading";
import Flag from "react-world-flags";
import DashboardCard from "../../components/dashboardCard";
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [wordsByLanguages, setWordsByLanguages] = useState();

  useEffect(() => {
    (async () => {
      const { data } = await network.get("/api/v1/progress");
      setWordsByLanguages(data);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {!loading ? (
        wordsByLanguages && (
          <div className="dashboard-page">
            {wordsByLanguages.map((wordsForLangue) => (
              <div className="dashboard-language-container">
                <div className="dashboard-language-title">
                  <Flag code={wordsForLangue.language.code.split("-")[1]} height="26" width="30" />
                  <span className="dashboard-language-title-language">
                    {wordsForLangue.language.language}
                  </span>
                </div>
                <div className="dashboard-words">
                  {wordsForLangue.words.map((wordAndTotalScore) => (
                    <DashboardCard
                      word={wordAndTotalScore.word}
                      translateWord={wordAndTotalScore.translateWord}
                      totalScore={wordAndTotalScore.totalScore}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
