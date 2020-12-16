const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  User.init(
    {
      code: { type: DataTypes.INTEGER, allowNull: false, unique: true },
      language: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Language",
      tableName: "languages",
    }
  );
  return Language;
};
