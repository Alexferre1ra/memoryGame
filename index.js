
// init new game
newGame();


arrTiles.push(get_random_tile()); // add the first one

// Last best winner
if (localStorage.getItem("name")) {
  score.innerHTML = `${localStorage.getItem("name")} reached 
level ${localStorage.getItem("level")}`;
}

// Event listeners for reload
reloadButton.addEventListener("click", reload, false);
