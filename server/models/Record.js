const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  User.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      wordId: { type: DataTypes.INTEGER, allowNull: false },
      record: { type: DataTypes.STRING, allowNull: false },
      recordingScore: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
