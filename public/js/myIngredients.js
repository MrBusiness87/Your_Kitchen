$(document).ready(() => {
  const searchButton = $("#searchButton");
  const addButton = $("#addButton");
  const ingredient = $("#search");
  const ingredientsDiv = $("#ingredients"); //ingredients div for display
  deleteIngredient(); //clear ingredients table
  addButton.on("click", (event) => {
    event.preventDefault();

    const Ingredient = ingredient.val().trim();
    console.log(Ingredient);
    addIngredient(Ingredient);
    ingredientsDiv.append("<h4>" + Ingredient + "</h4>");
    ingredient.val("");

    function addIngredient(ingredient) {
      $.post("/api/ingredient", {
        ingredient: ingredient,
      })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    }
  });

  searchButton.on("click", (event) => {
    event.preventDefault();

    dbIngredients();

    function dbIngredients() {
      $.get("/api/ingredient")
        .then((res) => {
          let searchURL =
            "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=";
          for (i = 0; i < res.length; i++) {
            if (i === 0) {
              searchURL += res[i].ingredient;
            } else {
              searchURL += "%252C" + res[i].ingredient;
            }
          }
          console.log(searchURL);
          // const settings = {
          //   async: true,
          //   crossDomain: true,
          //   url: searchURL,
          //   method: "GET",
          //   headers: {
          //     "x-rapidapi-host":
          //       "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          //     "x-rapidapi-key":
          //       "0ada17a314mshe0574db4c12a595p187297jsn28f33c886f1b",
          //   },
          // };
          // $.ajax(settings).done((response) => {
          //   console.log(response);
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  function deleteIngredient() {
    $.ajax({
      method: "DELETE",
      url: "/api/ingredient",
    })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
