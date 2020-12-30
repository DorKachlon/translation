import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import network from "../../../services/network";
import Flag from "react-world-flags";
import "./style.css";
export default function DropLanguages() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [languagesArr, setLanguagesArr] = useState([]);
  const [learningLanguage, setLearningLanguage] = useState();
  const [otherLearningLanguage, setOtherLearningLanguage] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { data: languages } = await network.get("/api/v1/users/progress/languages");
        setOtherLearningLanguage(languages);
        const { data: userInfo } = await network.get("/api/v1/users/languages");
        console.log(userInfo);
        setLearningLanguage(userInfo.currentLanguage);
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
    setAnchorEl(null);
    setLearningLanguage(language);
    await network.put("/api/v1/users", { currentLanguageId: language.id });
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {learningLanguage && learningLanguage.code && (
        <>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <span className="drop-span-container">
              <Flag code={learningLanguage.code.split("-")[1]} height="16" width="20" />
              <span className="drop-language">{learningLanguage.language}</span>
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
            {otherLearningLanguage.map(
              (language, i) =>
                language.id !== learningLanguage.id && (
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
