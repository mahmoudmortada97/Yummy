import getCountryCode from "./getCountryCode.js";

export default class Detail {
  constructor(details) {
    this.details = details;
  }
  getMealDetails = async (id) => {
    const detailsAPI = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const detailsAPIData = (await detailsAPI.json()).meals;
    console.log(detailsAPIData);
    this.showMealDetails(detailsAPIData);
  };

  showMealDetails = (detailsAPIData) => {
    $("#search").addClass("d-none");
    $("#main").addClass("d-none", function () {
      $("#details").removeClass("d-none");
    });
    this.details.html(" ").html(`
    <div class="col-md-4">
    <div class="content">
      <img
        src="${detailsAPIData[0].strMealThumb}"
        alt=""
        id="detailsImage"
        class="img-fluid"
      />
      <h1 class="text-info mt-2">${detailsAPIData[0].strMeal}</h1>
    </div>
  </div>
  <div class="col-md-8">
    <div class="content text-white">
      <h2>Instructions: <span id="title" class="fs-6 d-block">${
        detailsAPIData[0].strInstructions
      }</span></h2>
      <h2>
        Area:
        <span id="category">${detailsAPIData[0].strArea}</span>
        <img id="country" src="http://www.geognos.com/api/en/countries/flag/${getCountryCode(
          detailsAPIData[0].strArea
        )}.png"
        )}" class="" style={width:10px}/>
      </h2>
      <h2>
        Category:
        <span id="platform">${detailsAPIData[0].strCategory}</span>
      </h2>
      <h2 id="recipes">
        Recipes:
        <div class="recipes d-flex flex-wrap gap-2 mt-1">
        </div>
      </h2>
      <h2 id="tags">
        Tags:
        <div class="tags d-flex flex-wrap gap-2 mt-1">

      </h2>

        <div class="links d-flex justify-content-center align-items-center mt-4 ">
          <a target="_blank" href="${
            detailsAPIData[0].strYoutube
          }" class="btn btn-outline-danger me-2" id="link"
            >Youtube</a
          >
          <a target="_blank" href="${
            detailsAPIData[0].strSource
          }" class="btn btn-outline-success" id="link"
            >Source</a
          >
        </div>
    </div>
  </div>`);

    let keys = Object.keys(detailsAPIData[0]);
    let keysMeasures = keys.filter((e) => e.startsWith("strMeasure"));
    let keysIngredients = keys.filter((e) => e.startsWith("strIngredient"));
    for (let i = 0; i < keysMeasures.length; i++) {
      if (
        !(
          detailsAPIData[0][keysMeasures[i]] == " " ||
          detailsAPIData[0][keysMeasures[i]] == "" ||
          detailsAPIData[0][keysMeasures[i]] == null
        )
      ) {
        $(".recipes").append(`<span class="badge text-bg-primary">${
          detailsAPIData[0][keysMeasures[i]]
        } ${detailsAPIData[0][keysIngredients[i]]} </span>
   `);
      }
    }
    if (detailsAPIData[0].strTags) {
      const tagsArray = detailsAPIData[0].strTags.split(",");
      console.log(tagsArray); 
      for (let i = 0; i < tagsArray.length; i++) {
        $(".tags")
          .append(` <span id="status" class="badge text-bg-success">${tagsArray[i]}</span>
        `);
      }
    } else {
      $(".tags")
        .append(` <span id="status" class="badge text-bg-danger">NO Tags</span>
    `);
    }
  };
}
