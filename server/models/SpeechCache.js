"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SpeechCache extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Language, {
        foreignKey: "languageId",
      });
    }
  }
  SpeechCache.init(
    {
      text: { type: DataTypes.STRING, allowNull: false },
      languageId: { type: DataTypes.INTEGER, allowNull: false },
      fileName: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "SpeechCache",
      tableName: "speech_cache",
    }
  );
  return SpeechCache;
};
