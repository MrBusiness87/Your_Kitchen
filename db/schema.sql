DROP DATABASE IF EXISTS your_kitchenDB;

CREATE DATABASE your_kitchenDB;

USE your_kitchenDB;

CREATE TABLE users_ingredients (
    id INT NOT NULL AUTO_INCREMENT,
    ingredient_id INT NOT NULL,
    ingredient_name VARCHAR(50),
    ingredient_amount INT NOT NULL,
    ingredient_unit VARCHAR(50),    
);

CREATE TABLE favorite_recipes(
    id INT NOT NULL AUTO_INCREMENT,
    -- not sure how to handle the recipes being favorited, do we save the name from the API or does the API have a unique identifier for each recipes
);