module.exports = function(sequelize, DataTypes) {
  const userRecipes = sequelize.define("userRecipes", {
    userID: DataTypes.INTEGER,
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    recipeID: DataTypes.INTEGER,
  });
  return userRecipes;
};
