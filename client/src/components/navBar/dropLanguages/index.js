import React, { useEffect, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import network from "../../../services/network";
import Flag from "react-world-flags";
import { CurrentLanguage } from "../../../context/CurrentLanguage";
import "./style.css";
export default function DropLanguages() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [languagesArr, setLanguagesArr] = useState([]);
  // const [CurrentLanguageContext.currentLanguage, CurrentLanguageContext.setCurrentLanguage] = useState();
  const [otherLearningLanguage, setOtherLearningLanguage] = useState();
  const CurrentLanguageContext = useContext(CurrentLanguage);

  useEffect(() => {
    (async () => {
      try {
        const { data: languages } = await network.get("/api/v1/users/progress/languages");
        setOtherLearningLanguage(languages);
        const { data: userInfo } = await network.get("/api/v1/users/languages");
        CurrentLanguageContext.setCurrentLanguage(userInfo.currentLanguage);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (language) => {
    setAnchorEl(null);
  };
  const handleChoose = async (language) => {
    try {
      setAnchorEl(null);
      await network.put("/api/v1/users", { currentLanguageId: language.id });
      CurrentLanguageContext.setCurrentLanguage(language);
    } catch (e) {
      console.error(e);
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {CurrentLanguageContext.currentLanguage && CurrentLanguageContext.currentLanguage.code && (
        <>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <span className="drop-span-container">
              <Flag
                code={CurrentLanguageContext.currentLanguage.code.split("-")[1]}
                height="16"
                width="20"
              />
              <span className="drop-language">
                {CurrentLanguageContext.currentLanguage.language}
              </span>
            </span>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            {otherLearningLanguage &&
              otherLearningLanguage.map(
                (language, i) =>
                  language.id !== CurrentLanguageContext.currentLanguage.id && (
                    <MenuItem onClick={() => handleChoose(language)} id={language.id} key={i}>
                      <span className="drop-span-container">
                        <Flag code={language.code.split("-")[1]} height="16" width="20" />
                        <span className="drop-language">{language.language}</span>
                      </span>
                    </MenuItem>
                  )
              )}
          </Menu>
        </>
      )}
    </>
  );
}
