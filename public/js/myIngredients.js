$(document).ready(() => {
  const searchButton = $("#searchButton");
  const addButton = $("#addButton");
  const ingredient = $("#search");
  const ingredientsDiv = $("#ingredients"); //ingredients div for display
  const searchURL =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=";

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

    dbIngredients(searchURL, (URL) => {
      const settings = {
        async: true,
        crossDomain: true,
        url: URL,
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "0ada17a314mshe0574db4c12a595p187297jsn28f33c886f1b",
        },
      };
      $.ajax(settings).done((response) => {
        const randomRecipeNum = Math.floor(Math.random() * response.length);

        const recipeID = response[randomRecipeNum].id;
        const title = response[randomRecipeNum].title;
        const image = response[randomRecipeNum].image;

        //get user id for DB input
        $.get("/api/user_data")
          .then((res) => {
            const userID = res.id;
            $.post("/api/userRecipes", {
              userID: userID,
              title: title,
              image: image,
              recipeID: recipeID,
            })
              .then(() => {
                window.location.replace("/recipeView");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
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

function dbIngredients(searchURL, callback) {
  $.get("/api/ingredient")
    .then((res) => {
      for (i = 0; i < res.length; i++) {
        if (i === 0) {
          searchURL += res[i].ingredient;
        } else {
          searchURL += "%252C" + res[i].ingredient;
        }
      }
      return callback(searchURL);
    })
    .catch((err) => {
      console.log(err);
    });
}
