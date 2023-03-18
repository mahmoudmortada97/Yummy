///  <reference types="../@types/jquery"/>

import Home from "./home.js";

export default class Ingredient {
  constructor(ingredientsContainer) {
    this.ingredientsContainer = ingredientsContainer;
  }
  getAllMealIngredients = async () => {
    this.ingredientsContainer.html(" ");
    const ingredientsAPI = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    const ingredientsAPIData = (await ingredientsAPI.json()).meals;
    for (let i = Math.floor(Math.random() * 50 + 10); i < 100; i++) {
      this.ingredientsContainer
        .append(`   <div class="ingredient col-sm-6 col-md-4 col-lg-3" role="button" data-ingredientName="${
        ingredientsAPIData[i].strIngredient.split(" ").lenght > 1
          ? ingredientsAPIData[i].strIngredient.split(" ").join("%20")
          : ingredientsAPIData[i].strIngredient
      }">
        <div class="content position-relative overflow-hidden">
          <img
            src="https://www.themealdb.com/images/ingredients/${
              ingredientsAPIData[i].strIngredient
            }.png"
            class="img-fluid rounded-3 mb-1"
            alt=""
          />
          <h2>${ingredientsAPIData[i].strIngredient}</h2>
          <p>
          ${
            ingredientsAPIData[i].strDescription
              ? ingredientsAPIData[i].strDescription
              : "NO DATA FOR THIS INGREDIENT"
          }
          </p>
        </div>
      </div>`);
    }
    const home = new Home();
    $(".ingredient").click((e) => {
      const ingredientName = $(e.target)
        .closest("div.ingredient")
        .attr("data-ingredientName");
      home.getAllMeals(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`
      );
      $("#ingredients").addClass("d-none");
      $("#main").removeClass("d-none");
    });
  };
}
