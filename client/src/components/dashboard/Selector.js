import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Flag from "react-world-flags";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function Selector({
  mode,
  label,
  languagesArr,
  beDisabled,
  setYourChoice,
  defaultV,
  registrestion,
}) {
  const classes = useStyles();

  const changeNative = async (language) => {
    if (registrestion) {
      setYourChoice(language);
    } else {
      try {
        if (mode === "native") {
          await axios.put("/api/v1/users", { nativeLanguageId: language.id });
        } else if (mode === "learning") {
          await axios.put("/api/v1/users", { currentLanguageId: language.id });
        }
      } catch (error) {}
    }
  };

  return (
    <>
      {languagesArr && (
        <Autocomplete
          disabled={beDisabled}
          id="native-language"
          defaultValue={defaultV}
          onChange={(event, value) => changeNative(value)}
          style={{ width: 300 }}
          options={languagesArr}
          classes={{
            option: classes.option,
          }}
          autoHighlight
          getOptionLabel={(option) => option.language}
          renderOption={(option) => (
            <React.Fragment>
              <span>
                <Flag code={option.code.split("-")[1]} height="16" width="20" />
              </span>
              {option.language} ({option.code})
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      )}{" "}
    </>
  );
}
