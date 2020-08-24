const update = $("#update");
const favorite = $("#favorite");
const recipeImg = $("#recipeImg"); //recipe image div for display
const ingredients = $("#ingredients"); //ingredients div for display
const ingredientsNeeded = $("#ingredientsNeeded");

update.on("click", () => {
  //When update button is click, this happens
});

favorite.on("click", () => {
  //When favorite button is click, this happens
});


var form = new FormData();
form.append("author", "Emily Henderson");
form.append("backgroundColor", "#ffffff");
form.append("fontColor", "#333333");
form.append("source", "spoonacular.com");
form.append("backgroundImage", "background1");
form.append("image", "The image.");
form.append("ingredients", "2 cups of green beans");
form.append("instructions", "cook the beans");
form.append("mask", "ellipseMask");
form.append("readyInMinutes", "60");
form.append("servings", "2");
form.append("title", "Pork tenderloin with green beans");

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/visualizeRecipe",
  "method": "POST",
  "headers": {
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": "0ada17a314mshe0574db4c12a595p187297jsn28f33c886f1b",
    "content-type": "multipart/form-data"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
  console.log(response);
});