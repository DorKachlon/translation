import React from "react";
import SettingSelectors from "../../components/selectors/SettingSelectors";
import "./style.css";
export default function Setting() {
  return (
    <div className="setting-page">
      <div className="setting-selectors">
        <SettingSelectors />
      </div>
    </div>
  );
}
