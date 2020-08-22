$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=apples%252Cflour%252Csugar",
    method: "GET",
    headers: {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": "0ada17a314mshe0574db4c12a595p187297jsn28f33c886f1b",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    let recipe = JSON.stringify(response[0].title) + "<br>" + "<img src='" + response[0].image + "'><br>";
    console.log(recipe);
    $("#recipes").append(recipe);
  });

  // $.get("/api/user_data").then(data => {
  //   $(".member-name").text(data.email);
  // });
});