import React, { useEffect, useState } from "react";
import network from "../../services/network";
import "./style.css";
import Loading from "../Loading";
import Gauge from "../../components/gauge";
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
                <div className="dashboard-language-title">{wordsForLangue.language.language}</div>
                <div className="dashboard-words">
                  {wordsForLangue.words.map((wordAndTotalScore) => (
                    <div className="dashboard-word-container">
                      <div>{wordAndTotalScore.Word.word}</div>
                      <Gauge value={wordAndTotalScore.totalScore} />
                    </div>
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
