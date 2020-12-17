const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Language, {
        foreignKey: "nativeLanguageId",
        as: "nativeLanguage",
      });
      this.belongsTo(models.Language, {
        foreignKey: "currentLanguageId",
        as: "currentLanguage",
      });
      this.hasMany(models.RefreshToken, {
        foreignKey: "email",
      });
      this.hasMany(models.Record, {
        foreignKey: "userId",
      });
      this.hasMany(models.Progress, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      nativeLanguageId: { type: DataTypes.INTEGER, allowNull: false },
      currentLanguageId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
