import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Flag from "react-world-flags";
import { fade, makeStyles } from "@material-ui/core/styles";
import network from "../../services/network";

const useStyles = makeStyles((theme) => ({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
  autoComplete: {
    position: "relative",
    borderRadius: "30px",
    backgroundColor: "rgba(255,255,255,0.3)",
    transition: theme.transitions.create("width"),
    "& div": {
      padding: "1px 3px 1px 15px !important",
    },
    width: "auto",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        //regular border
        border: "none",
      },
      "&.Mui-focused fieldset": {
        //focused border
        border: "none",
      },
      "&:hover fieldset": {
        //hover border
        border: "none",
      },
    },
  },
}));

export default function Selector({
  mode,
  label,
  languagesArr,
  beDisabled,
  setYourChoice,
  defaultV,
  registration,
}) {
  const classes = useStyles();

  const changeNative = async (language) => {
    if (registration) {
      setYourChoice(language);
    } else {
      try {
        if (mode === "native") {
          await network.put("/api/v1/users", { nativeLanguageId: language.id });
        } else if (mode === "learning") {
          await network.put("/api/v1/users", { currentLanguageId: language.id });
        }
      } catch (error) {}
    }
  };

  return (
    <>
      {languagesArr && (
        <Autocomplete
          className={classes.autoComplete}
          disabled={beDisabled}
          defaultValue={defaultV}
          onChange={(event, value) => changeNative(value)}
          style={{ width: "100%" }}
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
              className={classes.textField}
              {...params}
              placeholder={label}
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      )}
    </>
  );
}
