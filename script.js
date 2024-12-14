function generateBoard() {
  const phrases = [
    "Snow", "Mistletoe", "Dinosaur", "Phrase 4", "Phrase 5",
    "Phrase 6", "Phrase 7", "Phrase 8", "Phrase 9", "Phrase 10",
    "Phrase 11", "Phrase 12", "Phrase 13", "Phrase 14", "Phrase 15",
    "Phrase 16", "Phrase 17", "Phrase 18", "Phrase 19", "Phrase 20",
    "Phrase 21", "Phrase 22", "Phrase 23", "Phrase 24", "Phrase 25", 
    "Phrase 26", "Phrase 27", "Phrase 28", "Phrase 29", "Phrase 30"
  ]; 


  const card = document.getElementById("bingoCard");
  const shuffledPhrases = shuffleArray(phrases);

  // Clear existing board
  card.innerHTML = ""; 

  // Generate rows and cells
  for (let i = 0; i < 5; i++) {
    const row = card.insertRow();
    for (let j = 0; j < 5; j++) {
      const cell = row.insertCell();
      if (i === 2 && j === 2) {
        cell.innerHTML = "Free Space";
      } else {
        const phraseIndex = i * 5 + j;
        if (phraseIndex < shuffledPhrases.length) {
          cell.innerHTML = shuffledPhrases[phraseIndex];
        }
      }
      cell.addEventListener("click", function() {
        this.classList.toggle("selected");
        checkBingo();
      });
    }
  }
  // After generating the board, move the header and button to the top center:
  document.getElementById("myHeader").style.position = "relative";
  document.getElementById("myHeader").style.fontSize = "2em"; // Reset font size 
  document.getElementById("generateButton").style.position = "relative"; 
  document.getElementById("generateButton").style.fontSize = "1.2em"; // Reset font size

}

function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function checkBingo() {
  const card = document.getElementById("bingoCard");
  const cells = card.getElementsByTagName("td"); 

  // Define the winning patterns (indices of cells in a 5x5 grid)
  const winningPatterns = [
    [0, 1, 2, 3, 4],  // Row 1
    [5, 6, 7, 8, 9],  // Row 2
    [10, 11, 12, 13, 14],  // Row 3
    [15, 16, 17, 18, 19],  // Row 4
    [20, 21, 22, 23, 24],  // Row 5
    [0, 5, 10, 15, 20],  // Column 1
    [1, 6, 11, 16, 21],  // Column 2
    [2, 7, 12, 17, 22],  // Column 3
    [3, 8, 13, 18, 23],  // Column 4
    [4, 9, 14, 19, 24],  // Column 5
    [0, 6, 12, 18, 24],  // Diagonal 1
    [4, 8, 12, 16, 20]   // Diagonal 2
  ];

  for (const pattern of winningPatterns) {
    let bingo = true;
    for (const index of pattern) {
      if (!cells[index].classList.contains("selected")) {
        bingo = false;
        break; 
      }
    }
    if (bingo) {
      alert("Bingo!");
      return; // Stop checking after finding a bingo
    }
  }
}