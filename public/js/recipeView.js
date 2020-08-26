var settings = {
  async: true,
  crossDomain: true,
  url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/4632/summary",
  method: "GET",
  headers: {
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": "0ada17a314mshe0574db4c12a595p187297jsn28f33c886f1b",
  },
}

$.ajax(settings).done(function (response) {
  console.log(response);
  const number = "<p>RECIPE #: " + response.id + "</p>";
  console.log(number);
  $("#number").append(number);
  const title = "<p>" + response.title + "</p>";
  console.log(title);
  $("#title").append(title);
  const summary = "<p>" + response.summary + "</p>";
  console.log(summary);
  $("#summary").append(summary);
});