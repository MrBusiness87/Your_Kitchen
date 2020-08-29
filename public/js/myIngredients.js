$(document).ready(() => {
  const searchButton = $("#searchButton");
  const addButton = $("#addButton");
  const ingredient = $("#search");
  const ingredientsDiv = $("#ingredients"); //ingredients div for display
  const deleteButton = $("#deleteButton");
  const searchURL =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=";

  //get user id for DB input
  $.get("/api/user_data")
    .then((res) => {
      const userID = res.id;
      ingredient.val(""); //clear entry
      renderIngredients();

      addButton.on("click", (event) => {
        event.preventDefault();

        const Ingredient = ingredient.val().trim();
        console.log(Ingredient);
        if (Ingredient != "") {
          addIngredient(Ingredient, userID);
        }

        function addIngredient(ingredient, userID) {
          $.post("/api/ingredient", {
            ingredient: ingredient,
            userID: userID,
          })
            .then(() => {
              window.location.replace("/myIngredients");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

      searchButton.on("click", (event) => {
        event.preventDefault();
        $.ajax({
          method: "GET",
          url: "/api/ingredient" + userID,
        })
          .then((data) => {
            console.log(data);
            if (data.length != 0) {
              console.log("search");
              dbIngredients(searchURL, data, (URL) => {
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
                  const randomRecipeNum = Math.floor(
                    Math.random() * response.length
                  );
                  const recipeID = response[randomRecipeNum].id;
                  const title = response[randomRecipeNum].title;
                  const image = response[randomRecipeNum].image;

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
                });
              });
            } else {
              console.log("Don't search");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
      //delete function for user ingredients
      function deleteIngredient() {
        $.ajax({
          method: "DELETE",
          url: "/api/ingredient" + userID,
        })
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      }

      function dbIngredients(searchURL, data, callback) {
        for (i = 0; i < data.length; i++) {
          if (i === 0) {
            searchURL += data[i].ingredient;
          } else {
            searchURL += "%252C" + data[i].ingredient;
          }
        }
        return callback(searchURL);
      }

      function renderIngredients() {
        $.ajax({
          method: "GET",
          url: "/api/ingredient" + userID,
        })
          .then((data) => {
            if (data.length != 0) {
              for (i = 0; i < data.length; i++) {
                ingredientsDiv.append("<h4>" + data[i].ingredient + "</h4>");
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      deleteButton.on("click", (event) => {
        event.preventDefault();
        deleteIngredient();
        window.location.replace("/myIngredients");
      });
    })

    .catch((err) => {
      console.log(err);
    });
});
