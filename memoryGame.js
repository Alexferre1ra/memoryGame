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

const difficulties = $$(".difficulty"); // difficulties btns
const container_ = document.querySelector('.container');
const level = document.querySelector('#level');
let tiles_ = [];
container_.classList.add('avoid-tap');




function newGame(tiles_) {
  
  const container = $(".container"); // tile's container
  const heading = document.getElementById("heading"); // heading h1
  const tiles = $$('.tile');
  tiles_ = [];

  newTiles(container, heading);
  get_random_tile(tiles);
  show_sequence();
}

function createTile(j) {
  newBtn = document.createElement("button");
  newBtn.className = "tile";
  newBtn.setAttribute("id", j)
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
    // disabled the difficulties choise
    difficulties.forEach((element) => {
      element.setAttribute("disabled", true);
    });

    //change the heading content when game start
    heading.innerHTML = "Now Repeat the sequencies";
  });
}
}

function get_random_tile(tiles) { // generate a random number between the number of tiles and 1
  return Math.floor(Math.random() * (tiles.length)) + 1;
}

function show_sequence(tiles_) {
  let i = 0,
    e;

  container_.classList.add('avoid-tap');

  (function blink() {
    e = document.getElementById(tiles_[i]);
    console.log(e);

    e.classList.remove('blink'); // remove class
    void e.offsetWidth; // "restart" -> triggering reflow
    e.classList.add('blink'); // show animation

    i++;

    if (i < tiles_.length) { // if there are more tiles
      setTimeout(blink, 1000); // wait 1s before show next one
    } else {
      setTimeout(function() { // wait 1s before allow user to tap 
        container_.classList.remove('avoid-tap');
      }, 1000);
    }
  })();
}

/**
 * Check sequence
 */
 let check_sequence = function(tiles) {
  let i = 0;

  return function(tile) {
    if (typeof(tile) === 'undefined') { // reset
      i = 0;
    } else { // play
      if (tile === tiles_[i]) { // success
        i++;
        // Keep playing
        if (i >= tiles_.length) { // we have guessed all
          $level_.textContent = tiles_.length; // set level before add
          tiles_.push(get_random_tile()); // add one more
          show_sequence();
          i = 0; // check from the beggining
        }
      } else {
   
        $level_.textContent = '☹ you failed';
        document.getElementById(tile).classList.add('fail');
        container_.classList.add('avoid-tap');
        i = 0;
        // Save user level if there is an improvement
        if (localStorage.getItem("level") === null ||
          tiles_.length - 1 > localStorage.getItem("level")) {
          setTimeout(function() {
            let name = prompt('Would you like to save your score? Write your name:');
            if (!name) return;
            localStorage.setItem('name', name);
            localStorage.setItem('level', tiles_.length - 1);
            $record_.textContent = `${name} reached level ${tiles.length - 1}`;
          }, 10);
        }
      }
    }
  }
}();


newGame();
