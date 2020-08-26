// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page

var search = "";
$("#dropdown1").click(function (event) {
  console.log("Button sent Info", event.target.innerHTML);
  search = event.target.innerHTML;
  $("#dropdown2").click(function (event) {
    console.log("Button sent Info", event.target.innerHTML);
    search = event.target.innerHTML;
    var settings = {
      async: true,
      crossDomain: true,
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=" + search,
      method: "GET",
      headers: {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "0ada17a314mshe0574db4c12a595p187297jsn28f33c886f1b",
      },
    };
    $.ajax(settings).done(function (response) {
      console.log(response);
      let recipe = "<h3>" + response[0].title + "<br><h3>Recipe #: <a id='recipeId' href='#!' onclick='launchRecipe(event)'>" + response[0].id + "</a></h3><br><img src='" + response[0].image + "'><br><h5>You will need: " + response[0].usedIngredients[0].name + "</h5>";
      console.log(recipe);
      $("#recipes").append(recipe);
    });
  });
});

function launchRecipe(event) {
  var recipeId = "";
  console.log(event);
  $("#recipeId").click(function (event) {
    console.log("SUCCESS", event.target.innerHTML);
    recipeId = event.target.innerHTML;

    var settings = {
      async: true,
      crossDomain: true,
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeId + "/summary",
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
  });
}

// $.get("/api/user_data").then(data => {
//   $(".member-name").text(data.email);
// });

$('.dropdown-trigger').dropdown();