import React, { useEffect, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import network from "../../../services/network";
import Flag from "react-world-flags";
import { UserLanguages } from "../../../context/UserLanguages";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { Link } from "react-router-dom";

import "./style.css";

export default function DropLanguages() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [allLearningLanguage, setAllLearningLanguage] = useState();
  const [otherLearningLanguage, setOtherLearningLanguage] = useState();
  const UserLanguagesContext = useContext(UserLanguages);
  useEffect(() => {
    (async () => {
      try {
        const { data: languages } = await network.get("/api/v1/users/learning-languages");
        setAllLearningLanguage(languages);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (allLearningLanguage && UserLanguagesContext.currentLanguage) {
        console.log(allLearningLanguage);
        const languages = allLearningLanguage.filter(
          (language) => language.id !== UserLanguagesContext.currentLanguage.id
        );
        if (languages.length !== 0) {
          setOtherLearningLanguage(languages);
        }
      }
    })();
  }, [allLearningLanguage, UserLanguagesContext.currentLanguage]);

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
      UserLanguagesContext.setCurrentLanguage(language);
    } catch (e) {
      console.error(e);
    }
  };
  const open = Boolean(anchorEl);
  //   const id = open ? "simple-popover" : undefined;

  return (
    <>
      {UserLanguagesContext.currentLanguage && UserLanguagesContext.currentLanguage.code && (
        <>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <span className="drop-span-container">
              <Flag
                code={UserLanguagesContext.currentLanguage.code.split("-")[1]}
                height="16"
                width="20"
              />
              <span className="drop-language">{UserLanguagesContext.currentLanguage.language}</span>
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
              otherLearningLanguage.map((language, i) => (
                <MenuItem onClick={() => handleChoose(language)} id={language.id} key={i}>
                  <span className="drop-span-container">
                    <Flag code={language.code.split("-")[1]} height="16" width="20" />
                    <span className="drop-language">{language.language}</span>
                  </span>
                </MenuItem>
              ))}
            <MenuItem component={Link} to="/languages" onClick={handleClose}>
              <span className="drop-span-container">
                <AddCircleOutlineRoundedIcon />
                <span className="drop-language">Add a new language</span>
              </span>
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
}
