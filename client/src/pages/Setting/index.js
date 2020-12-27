import React, { useState } from "react";
import SettingSelectors from "../../components/selectors/SettingSelectors";
import Loading from "../Loading";
import "./style.css";
export default function Setting() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <Loading />}
      <div className="setting-page">
        <div className="setting-selectors">
          <SettingSelectors setLoading={setLoading} />
        </div>
      </div>
    </>
  );
}
