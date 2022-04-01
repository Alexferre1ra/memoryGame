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
                  The Game                   
  ===========================================*/

const difficulties = $$(".difficulty"); // difficulties btns
const level = document.querySelector("#level");
const container = $(".container"); // tile's container
const heading = document.getElementById("heading"); // heading h1
const colors = [
  "red",
  "blue",
  "yellow",
  "green",
  "orange",
  "pink",
  "blueviolet",
  "turquoise",
  "violet",
];
const record = document.getElementById("record");
const reloadButton = document.querySelector(".reload");

var tiles = [];
var arrTiles = [];

container.classList.add("avoid-tap");

function newGame() {
  newTiles(container, heading);
}

function createTile(j) {
  newBtn = document.createElement("button");
  newBtn.className = "tile";
  newBtn.setAttribute("id", j);
}

function newTiles(container, heading) {
  // each level set a number of tile
  for (let i = 0; i < difficulties.length; i++) {
    let j = 1;
    difficulties[i].addEventListener("click", function () {
      switch (difficulties[i].value) {
        case "easy":
          // console.log("easy button");
          for (i = 0; i < 4; i++) {
            createTile(j);
            container.appendChild(newBtn);
            j++;
          }
          break;

        case "intermediate":
          // console.log("intermediate button");
          for (i = 0; i < 6; i++) {
            createTile(j);
            container.style.width = "324px";
            container.appendChild(newBtn);
            j++;
          }
          break;

        case "hard":
          // console.log("hard button");
          for (i = 0; i < 9; i++) {
            createTile(j);
            container.style.width = "324px";
            container.appendChild(newBtn);
            j++;
          }
          break;

        default:
          break;
      }
      tiles = $$(".tile");

      for (let j = 0; j < tiles.length; j++) {
        for (let i = 0; i < colors.length; i++) {
          tiles[j].style.backgroundColor = colors[i];
        }
      }

      // disabled the difficulties choise
      difficulties.forEach((element) => {
        element.setAttribute("disabled", true);
      });

      //change the heading content when game start
      heading.innerHTML = "Now Repeat the sequencies";

      // // Clear
      // arrTiles = []; // reset sequence
      // level.textContent = arrTiles.length;
      // check_sequence(); // reset when no parameters

      // arrTiles.push(get_random_tile(tiles)); // add the first one

      show_sequence();
      // check_sequence();
      // Click on one of the 4 pieces (numbers)
      tiles.forEach((e) => {
        e.addEventListener("click", function () {
          check_sequence(Number(this.getAttribute("id")));
        });
      });
    });
  }
}

/**
 * Generate next tile (number)
 */
function get_random_tile() {
  // generate a random number between the number of tiles and 1
  return Math.floor(Math.random() * tiles.length) + 1;
}

function show_sequence() {
  let i = 0,
    e;

  container.classList.add("avoid-tap");

  (function blink() {
    e = document.getElementById(arrTiles[i]);

    e.classList.remove("blink"); // remove class
    void e.offsetWidth; // "restart" -> triggering reflow
    e.classList.add("blink"); // show animation

    i++;

    if (i < arrTiles.length) {
      // if there are more tiles
      setTimeout(blink, 1000); // wait 1s before show next one
    } else {
      setTimeout(function () {
        // wait 1s before allow user to tap
        container.classList.remove("avoid-tap");
      }, 1000);
    }
  })();
}

/**
 * Check sequence
 */
let check_sequence = (function () {
  let i = 0;

  return function (tile) {
    if (typeof tile === "undefined") {
      // reset
      i = 0;
    } else {
      // play
      if (tile === arrTiles[i]) {
        // success
        i++;
        // Keep playing
        if (i >= arrTiles.length) {
          // we have guessed all
          level.textContent = arrTiles.length; // set level before add a new blinked tile
          arrTiles.push(get_random_tile(tiles)); // add one more
          show_sequence();
          i = 0; // check from the beggining
        }
      } else {
        level.textContent = "Too bad ☹ You loose! Try again";
        document.getElementById(tile).classList.add("fail");
        container.classList.add("avoid-tap");
        i = 0;
        // Save user level if there is an improvement
        if (localStorage.getItem("level") === null ||
          pieces_.length - 1 > localStorage.getItem("level")) {
          setTimeout(function() {
            let name = prompt('Would you like to save your score? Write your name here:');
            if (!name) return;
            localStorage.setItem('name', name);
            localStorage.setItem('level', tiles.length - 1);
            record.textContent = `${name} reached level ${tiles.length - 1}`;
          }, 10);
        }
      }
    }
  };
})();
