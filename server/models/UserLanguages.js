const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserLanguages extends Model {
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
            });
        }
    }

    UserLanguages.init(
        {
            userId: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
            languageId: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
        },
        {
            sequelize,
            modelName: "UserLanguages",
            tableName: "users_languages",
        }
    );
    return UserLanguages;
};
