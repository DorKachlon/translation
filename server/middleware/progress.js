const { Progress } = require("../helperFunctions/userProgress");

let progressContainer = {};
module.exports = function (req, res, next) {
  const userInfo = req.user;
  if (progressContainer[userInfo.id]) {
    req.userProgress = progressContainer[userInfo.id];
  }
  console.log("progressContainer", progressContainer);
  next();
};

function createNewProgress(userInfo) {
  let newProgress = new Progress(userInfo);
  progressContainer[userInfo.id] = newProgress;
}

function removeProgress(userInfo) {
  delete progressContainer[userInfo.id];
}
module.exports.createNewProgress = createNewProgress;
module.exports.removeProgress = removeProgress;
