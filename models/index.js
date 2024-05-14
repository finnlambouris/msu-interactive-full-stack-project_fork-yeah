const User = require('./User');
const Photo = require('./Photo');
const Recipe = require('./Recipe');

User.hasMany(Recipe, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Recipe.belongsTo(User, {
    foreignKey: "user_id",
});

Recipe.hasOne(Photo, {
    foreignKey: "photo_id",
    onDelete: "CASCADE",
});

Photo.belongsTo(Recipe, {
    foreignKey: "user_id",
});

module.exports = {
    User,
    Recipe,
    Photo,
  };