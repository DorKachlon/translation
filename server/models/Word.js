const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  User.init(
    {
      word: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
      languageId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    },
    {
      sequelize,
      modelName: "Word",
      tableName: "words",
    }
  );
  return Word;
};
