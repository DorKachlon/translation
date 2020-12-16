export const sortArray = (languages) => {
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

export const filterArray = (languages, obj) => {
  return languages.filter((item) => item.code !== obj.code);
};
