module.exports = function(sequelize, DataTypes) {
  const Ingredients = sequelize.define("Ingredients", {
    ingredient: DataTypes.STRING,
    userID: DataTypes.INTEGER,
  });
  return Ingredients;
};
