///  <reference types="../@types/jquery"/>

import Detail from "./details.js";

export default class Home {
  constructor() {}
  getAllMeals = async (
    link = "https://www.themealdb.com/api/json/v1/1/search.php?s="
  ) => {
    $(".meals-container").html(" ");
    const mealsAPI = await fetch(link);
    const mealsAPIData = (await mealsAPI.json()).meals;
    console.log(link);
    for (let i = 0; i < mealsAPIData.length; i++) {
      $(".meals-container").append(`
        <div class="meal col-sm-6 col-md-4 col-lg-3" role="button" data-id="${mealsAPIData[i].idMeal}">
        <div class="content position-relative overflow-hidden">
          <img
            src="${mealsAPIData[i].strMealThumb}"
            class="img-fluid rounded-3"
            alt=""
          />
          <div
            class="hidden-layer d-flex align-items-center position-absolute p-3 rounded-3"
          >
            <h2 class="display-5">${mealsAPIData[i].strMeal}</h2>
          </div>
        </div>
      </div>`);
    }
    const detail = new Detail($(".details")); // make detail instance
    // get details for clicked meal
    $(".meal").click(function (e) {
      const mealID = $(e.target).closest("div.meal").attr("data-id");
      detail.getMealDetails(mealID);
    });
  };
}

let x = "Apple pie";
if (x.split(" ").length > 1) {
  console.log(x.split(" ").join("%20"));
} else {
  console.log(x);
}
