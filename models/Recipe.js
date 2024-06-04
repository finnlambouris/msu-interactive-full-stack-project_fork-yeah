const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Recipe extends Model {
  // Instance method to check ownership
  isCreatedBy(userId) {
    return this.user_id === userId;
  }
}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.STRING(500),
    },
    instructions: {
      type: DataTypes.STRING(1000),
    },
    photo: {
      type: DataTypes.STRING(100),
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize: sequelize,
    freezeTableName: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    modelName: "recipes",
  },
);

module.exports = Recipe;
