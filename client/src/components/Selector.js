import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Flag from "react-world-flags";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const sortArray = (languages) => {
  languages.sort(function (a, b) {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });
  return languages;
};

export default function Selector({ label, languagesArr, beDisabled }) {
  const classes = useStyles();
  const [nativeLanguage, setNativeLanguage] = useState();
  const [learningLanguage, setLearningLanguage] = useState();

  const changeNative = (native) => {
    setNativeLanguage(native);
  };

  console.log(nativeLanguage);
  return (
    <Autocomplete
      disabled={beDisabled}
      id="native-language"
      onChange={(event, value) => changeNative(value)}
      style={{ width: 300 }}
      options={languagesArr && sortArray(languagesArr)}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(option) => (
        <React.Fragment>
          <span>
            <Flag code={option.code.split("-")[1]} height="16" width="20" />
          </span>
          {option.label} ({option.code})
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
  );
}
