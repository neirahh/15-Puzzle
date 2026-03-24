document.addEventListener("DOMContentLoaded", function() {
  const cells = Array.from(document.getElementsByTagName("td"));

  for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      cell.addEventListener("click", function() {
          const clicked = cells.indexOf(this);
          const blank = getBlank(cells);

          if (isAdjacent(clicked, blank)) { // swap if clicked cell is adjacent to blank cell
              const temp = cells[clicked].innerText;
              cells[clicked].innerText = cells[blank].innerText;
              cells[blank].innerText = temp;

              if (isSolved(cells)) { // change grid color if puzzle is solved
                  document.getElementById("puzzleTable").style.backgroundColor = "lightgreen";
              }
          }
      });
  }

  // reset button
  document.getElementById("reset").addEventListener("click", function() {
      for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          cell.innerText = String(i + 1);
      }
      cells[cells.length - 1].innerText = "";
      document.getElementById("puzzleTable").style.backgroundColor = "";
  });

  // scramble button
  document.getElementById("scramble").addEventListener("click", function() {
      for (let i = 0; i < 1000; i++) {
          const randomIndex = Math.floor(Math.random() * cells.length);
          cells[randomIndex].click();
      }
      document.getElementById("puzzleTable").style.backgroundColor = "";
  });
});

function getBlank(cells) { // get index of blank cell
  for (let i = 0; i < cells.length; i++) {
      if (cells[i].innerText === "") {
          return i;
      }
  }
}

function isAdjacent(index1, index2) { // check if 2 cells are adjacent to swap
  const row1 = Math.floor(index1 / 4);
  const col1 = index1 % 4;
  const row2 = Math.floor(index2 / 4);
  const col2 = index2 % 4;

  return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
}

function isSolved(cells) { // check if puzzle is solved
  for (let i = 0; i < cells.length - 1; i++) {
      if (cells[i].innerText !== String(i + 1)) {
          return false;
      }
  }
  return cells[cells.length - 1].innerText === "";
}