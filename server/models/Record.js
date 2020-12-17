const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.belongsTo(models.Word, {
        foreignKey: "wordId",
      });
    }
  }
  Record.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      wordId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      record: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
      recordingScore: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Record",
      tableName: "records",
    }
  );
  return Record;
};
