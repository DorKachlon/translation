"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Progress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.belongsTo(models.Language, {
        foreignKey: "languageId",
        as: "language",
      });
      this.belongsTo(models.Word, {
        foreignKey: "wordId",
      });
    }
  }
  Progress.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      languageId: { type: DataTypes.INTEGER, allowNull: false },
      wordId: { type: DataTypes.INTEGER, allowNull: false },
      score: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Progress",
      tableName: "progress",
    }
  );
  return Progress;
};
