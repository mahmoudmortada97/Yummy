///  <reference types="../@types/jquery"/>
import getCountryCode from "./getCountryCode.js";
import Home from "./home.js";

export default class Area {
  constructor(areasContainer) {
    this.areasContainer = areasContainer;
  }
  getAllMealAreas = async () => {
    this.areasContainer.html(" ");
    const areasAPI = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const areasAPIData = (await areasAPI.json()).meals;
    for (let i = 0; i < areasAPIData.length; i++) {
      this.areasContainer
        .append(` <div class="country col-sm-6 col-md-4 col-lg-3" data-country =${
        areasAPIData[i].strArea
      } >
        <div class="content position-relative overflow-hidden ">
          <img id="id-${i}"
            src="http://www.geognos.com/api/en/countries/flag/${
              getCountryCode(areasAPIData[i].strArea)
                ? getCountryCode(areasAPIData[i].strArea)
                : "UN"
            }.png"
            class="img-fluid rounded-3 mb-3"
            alt=""
            role="button"
          />
          <h2 role="button">${areasAPIData[i].strArea}</h2>
        </div>
      </div>`);
    }
    $("#area #id-25").attr(
      "src",
      "https://upload.wikimedia.org/wikipedia/commons/2/2e/Unknown_flag_-_European_version.png"
    );
    const home = new Home();
    $(".country").click((e) => {
      const countryName = $(e.target)
        .closest("div.country")
        .attr("data-country");
      home.getAllMeals(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryName}`
      );
      $("#area").addClass("d-none");
      $("#main").removeClass("d-none");
    });
  };
}
