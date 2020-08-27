module.exports = function(sequelize, DataTypes) {
  const Ingredients = sequelize.define("Ingredients", {
    ingredient: DataTypes.STRING,
  });
  return Ingredients;
};
