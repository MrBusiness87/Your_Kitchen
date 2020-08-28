const recipeTitle = $("#title");
const recipeImg = $("#recipeImg");
const updateSaveButoon = $("#updateSaveButton");
const message = $("#message");

recipeTitle.empty();
recipeImg.empty();
message.empty();
updateSaveButoon.hide();

$.get("/api/user_data")
  .then((res) => {
    const userID = res.id;
    getRecipeData();

    function getRecipeData() {
      $.ajax({
        method: "GET",
        url: "/api/userRecipes" + userID,
      })
        .then((res) => {
          if (res.length != 0) {
            const recipeID = res[res.length - 1].recipeID;
            const settings = {
              async: true,
              crossDomain: true,
              url:
                "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" +
                recipeID +
                "/summary",
              method: "GET",
              headers: {
                "x-rapidapi-host":
                  "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key":
                  "0ada17a314mshe0574db4c12a595p187297jsn28f33c886f1b",
              },
            };
            $.ajax(settings).done((data) => {
              const title = res[res.length - 1].title;
              const image = res[res.length - 1].image;
              const summary = data.summary;
              renderRecipe(title, image, summary);
            });
          } else {
            message.append(
              '<h2 class="center-align">Add some recipes to you Profile!</h2>' +
                '<br> <img src="https://spoonacular.com/recipeImages/Grandmas-Apple-Crisp-645152.jpg" class="center">'
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function renderRecipe(title, image, summary) {
      recipeTitle.append("<h2>" + title + "</h2>");
      recipeImg.append("<img src=" + image + ">");
      recipeTitle.append("<br>" + summary);
      updateSaveButoon.show();
    }
  })
  .catch((err) => {
    console.log(err);
  });
