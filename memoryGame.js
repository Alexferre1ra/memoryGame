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
  let levels = $$(".level");
  const container = $("div .container");
  // console.log(levels);
  for (let i = 0; i < levels.length; i++) {
    levels[i].addEventListener("click", function() {
      switch (levels[i].value) {
        case "easy":
          // console.log("button easy");
          let lines = document.createElement("div");
          lines.classList.add('line');
          let buttons = document.createElement("button");
          buttons.classList.add()
          container.appendChild(lines*2);
          break;
          case "intermediate":
            // console.log("button intermediate")
          break;
          case "hard":
            // console.log("button hard")
          break;
      
        default:
          break;
      }
    });;
    
  }
