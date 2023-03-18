const submitBtn = document.querySelector("#submitBtn"),
  inputs = document.querySelectorAll("#contact-us input");

// for (let i = 0; i < inputs.length; i++) {
//   inputs[i].addEventListener("input", () => {
//     if (
//       inputs[0].classList.contains("success") &&
//       inputs[1].classList.contains("success") &&
//       inputs[2].classList.contains("success") &&
//       inputs[3].classList.contains("success") &&
//       inputs[4].classList.contains("success") &&
//       inputs[5].classList.contains("success")
//     ) {
//       submitBtn.removeAttribute("disabled");
//       console.log("true");
//     } else {
//       submitBtn.setAttribute("disabled", "");
//       console.log("false");
//     }
//   });
// }

$("form input").on("input", function (e) {
  isValidInput($(e.target));
});
function isValidInput(input) {
  const uservalue = input.val();
  let regex;
  switch (input.attr("data-inputType")) {
    case "name":
      regex =
        /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/g.test(
          uservalue
        );
      break;
    case "age":
      regex = /^(1[89]|[2-9]\d)$/g.test(uservalue);
      break;
    case "email":
      regex =
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g.test(
          uservalue
        );
      break;
    case "phone":
      regex = /^01[0125][0-9]{8}$/g.test(uservalue);
      break;
    case "pass":
      regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g.test(uservalue);
      break;
    case "confirmPass":
      regex = $("#pass").val() == $("#confirmPass").val();
      break;
  }
  if (regex) {
    input.removeClass("error", function () {
      input.addClass("success");
    });
    $(input.next()).animate({ opacity: "0" }, 200);
  } else {
    input.removeClass("success", function () {
      input.addClass("error");
    });
    $(input.next()).animate({ opacity: "1" }, 200);
  }
}
