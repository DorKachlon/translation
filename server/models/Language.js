"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User, {
        foreignKey: "nativeLanguageId",
      });
      this.hasMany(models.User, {
        foreignKey: "currentLanguageId",
      });
      this.hasMany(models.Word, {
        foreignKey: "languageId",
      });
      this.hasMany(models.Progress, {
        foreignKey: "languageId",
      });
    }
  }
  Language.init(
    {
      code: { type: DataTypes.STRING, allowNull: false, unique: true },
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
