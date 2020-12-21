"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Language, {
        foreignKey: "languageId",
      });
      this.hasMany(models.Record, {
        foreignKey: "wordId",
      });
    }
  }
  Word.init(
    {
      // id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      word: { type: DataTypes.STRING, allowNull: false },
      languageId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Word",
      tableName: "words",
    }
  );
  return Word;
};
