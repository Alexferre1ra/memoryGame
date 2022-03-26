/*===========================================
               Query Selectors
  ===========================================*/

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

/*===========================================
    Creating tiles in relation to level set
  ===========================================*/
function newGame() {
  const levels = $$(".level"); // levels btns
  const container = $(".container"); // tile's container
  const heading = document.getElementById("heading"); // heading h1

  // creating new tile
  function newTile() {
    newBtn = document.createElement("button");
    newBtn.className = "tile";
  }

  // each level set a number of tile
  for (let i = 0; i < levels.length; i++) {
    levels[i].addEventListener("click", function () {
      switch (levels[i].value) {
        case "easy":
          // console.log("easy button");
          for (i = 0; i < 4; i++) {
            newTile();
            container.appendChild(newBtn);
          }
          break;

        case "intermediate":
          // console.log("intermediate button");
          for (i = 0; i < 6; i++) {
            newTile();
            container.style.width = "324px";
            container.appendChild(newBtn);
          }
          break;

        case "hard":
          // console.log("hard button");
          for (i = 0; i < 9; i++) {
            newTile();
            container.style.width = "324px";
            container.appendChild(newBtn);
          }
          break;

        default:
          break;
      }
      // disabled the levels choise
      levels.forEach((element) => {
        element.setAttribute("disabled", true);
      });

      //change the heading content when game start
      heading.innerHTML = "Now Repeat the sequencies";
      chColors();
    });
  }
}

/*===========================================
      Change the color of tiles randomly
  ===========================================*/
function chColors() {
  //  collect buttons
  const buttons = $$(".tile");
  //  console.log(buttons);

  let code = new Array();
  for (let i = 0; i < buttons.length; i++) {
    let random = Math.floor(Math.random() * buttons.length);
    code[i] = buttons[random];
  }
  return code;
}

newGame();
