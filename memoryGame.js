function $(selector, el) {
  if (!el) {
    el = document;
  }
  return el.querySelector(selector);
}
function $$(selector, el) {
  if (!el) {
    el = document;
  }
  return Array.prototype.slice.call(el.querySelectorAll(selector));
}

// Creating button in relation to level selected
function chLevel(params) {
	
}
	console.log($$(".level"));
  $(".level").addEventListener("click", function(){
    switch (levels) {
      case (levels.value = "easy"):
        console.log("easy");
        break;
      case (levels.value = "intermediate"):
        console.log("intermediate");
        break;
      case (levels.value = "hard"):
        console.log("hard");
        break;

      default:
        break;
    }
  });
