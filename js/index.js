///  <reference types="../@types/jquery"/>

import Area from "./area.js";
import Category from "./categories.js";
import Detail from "./details.js";
import Home from "./home.js";
import Ingredient from "./Ingredient.js";
import Search from "./search.js";

const mealsContainer = $(".meals-container"),
  ingredientContainer = $(".ingredient-container"),
  categoriesContainer = $(".category-container"),
  areaContainer = $(".area-container"),
  searchByName = $("#searchByName"),
  searchByFirstLetter = $("#searchByFirstLetter");

const meal = new Home(mealsContainer);
meal.getAllMeals(); // Show all meals
$("header").click(() => {
  meal.getAllMeals(); // Show all meals when click on Header Logo in Sidebar
});

const search = new Search(searchByName, searchByFirstLetter, mealsContainer);
$(".input-search").keyup(function (e) {
  search.getMealsBySearch(e); // Show all meals by search using 2 types of search (fullname, firstletter)
});

const category = new Category(categoriesContainer);
category.getAllMealCategories(); // show all meals categories

const ingredient = new Ingredient(ingredientContainer);
ingredient.getAllMealIngredients(); // show all meals categories

const area = new Area(areaContainer);
area.getAllMealAreas(); // show all meals areas

// toggle between clicked link in sidebar
$(".sidebar ul li a").click((e) => {
  $("section:visible").addClass("d-none", () => {
    $(`#${$(e.target).attr("data-section")}`).removeClass("d-none");
  });
});

// go to main section when clicking on logo image
$("#logo").click((e) => {
  $("section:visible").addClass("d-none", () => {
    $("#main").removeClass("d-none");
  });
});
// close details and back to main section
$("#closeBtn").click(function () {
  $("#details").addClass("d-none", function () {
    $("#main").removeClass("d-none");
  });
});
