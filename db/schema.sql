DROP DATABASE IF EXISTS your_kitchenDB;

CREATE DATABASE your_kitchenDB;

USE your_kitchenDB;

CREATE TABLE users_ingredients (
    id INT NOT NULL AUTO_INCREMENT,
    ingredient_name VARCHAR(50),
    -- quantity VARCHAR OR INT, depends on the API,
);

CREATE TABLE favorite_recipes(
    id INT NOT NULL AUTO_INCREMENT,
    -- not sure how to handle the recipes being favorited, do we save the name from the API or does the API have a unique identifier for each recipes
);