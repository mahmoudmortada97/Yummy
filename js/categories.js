///  <reference types="../@types/jquery"/>

import Home from "./home.js";

export default class Category {
  constructor(categoriesContainer) {
    this.categoriesContainer = categoriesContainer;
  }
  getAllMealCategories = async () => {
    let ingredientData;

    this.categoriesContainer.html(" ");
    const categoriesAPI = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const categoriesAPIData = (await categoriesAPI.json()).categories;
    
    for (let i = 0; i < categoriesAPIData.length; i++) {
      this.categoriesContainer
        .append(` <div class="category col-sm-6 col-md-4 col-lg-3" role="button" 
        data-categoryName=${categoriesAPIData[i].strCategory}>
        <div class="content position-relative overflow-hidden">
          <img
            src=${categoriesAPIData[i].strCategoryThumb}
            class="img-fluid rounded-3"
            alt=""
          />
          <div
            class="hidden-layer d-flex flex-column justify-content-center align-items-start position-absolute py-3"
          >
            <h2 class="text-danger text-center mx-auto">${categoriesAPIData[i].strCategory}</h2>
            <p class="text-dark fs-6  p-3 ">
              ${categoriesAPIData[i].strCategoryDescription}
            </p>
          </div>
        </div>
      </div>`);
    }
    const home = new Home();
    $(".category").click((e) => {
      const categoryName = $(e.target)
        .closest("div.category")
        .attr("data-categoryName");
      home.getAllMeals(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
      );
      $("#categories").addClass("d-none");
      $("#main").removeClass("d-none");
    });
  };
}
