export const sortArray = (languagesArr) => {
  languagesArr.sort(function (a, b) {
    if (a.language < b.language) {
      return -1;
    }
    if (a.language > b.language) {
      return 1;
    }
    return 0;
  });
  return languagesArr;
};

export const filterArray = (languagesArr, obj) => {
  return languagesArr.filter((item) => item.code !== obj.code);
};
