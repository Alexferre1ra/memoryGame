// init new game
newGame();

// Clear
arrTiles = []; // reset sequence
level.textContent = arrTiles.length;
check_sequence(); // reset when no parameters

arrTiles.push(get_random_tile(tiles)); // add the first one

// Last best winner
if (localStorage.getItem("name")) {
  record.textContent = `${localStorage.getItem("name")} reached 
level ${localStorage.getItem("level")}`;
}

// Event listeners for reload
reloadButton.addEventListener("click", reload, false);
