///  <reference types="../@types/jquery"/>

import Detail from "./details.js";

export default class Search {
  constructor(searchByName, searchByFirstLetter, mealsContainer) {
    this.mealsContainer = mealsContainer;
    this.searchByName = searchByName;
    this.searchByFirstLetter = searchByFirstLetter;
  }
  getMealsBySearch = async function (e) {
    let mealsAPI; // Meal API

    this.mealsContainer.html(" "); // Clear The meal container

    /* When Start Typing in Specific input clear the other one to prvent conflict */
    if ($(e.target).attr("id") == "searchByFirstLetter") {
      $(this.searchByName).val("");
      // Get All Meals With FirstLetter = User Entered Letter
      mealsAPI = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${$(
          e.target
        ).val()}`
      );
    } else {
      $(this.searchByFirstLetter).val("");
      // Get All Meals With FullName = User Entered FullName

      mealsAPI = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${$(
          e.target
        ).val()}`
      );
    }

    // If both search inputs are empty, then will not show any data
    if (this.searchByName.val() == "" && this.searchByFirstLetter.val() == "") {
      $("#main").addClass("d-none");
    } else {
      $("#main").removeClass("d-none");
    }
    // The retrived Array from the search Process
    const mealsAPIData = (await mealsAPI.json()).meals;
    // Check if There is data has retrived then loop to show all meals
    if (mealsAPIData) {
      for (let i = 0; i < mealsAPIData.length; i++) {
        this.mealsContainer.append(`
            <div class="meal col-sm-6 col-md-4 col-lg-3"  role="button" data-id="${mealsAPIData[i].idMeal}">
            <div class="content position-relative overflow-hidden">
              <img
                src="${mealsAPIData[i].strMealThumb}"
                class="img-fluid rounded-3"
                alt=""
              />
              <div
                class="hidden-layer d-flex align-items-center position-absolute p-3 rounded-3"
              >
                <h2>${mealsAPIData[i].strMeal}</h2>
              </div>
            </div>
          </div>`);
      }
    }
    const detail = new Detail($(".details"));

    $(".meal").click(function (e) {
      const mealID = $(e.target).closest("div.meal").attr("data-id");
      detail.getMealDetails(mealID);
    });
  };
}
