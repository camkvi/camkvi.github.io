document.addEventListener('DOMContentLoaded', function() {
  const phrases = [
    "Snow", "Mistletoe", "Dinosaur", "Phrase 4", "Phrase 5",
    "Phrase 6", "Phrase 7", "Phrase 8", "Phrase 9", "Phrase 10",
    "Phrase 11", "Phrase 12", "Phrase 13", "Phrase 14", "Phrase 15",
    "Phrase 16", "Phrase 17", "Phrase 18", "Phrase 19", "Phrase 20",
    "Phrase 21", "Phrase 22", "Phrase 23", "Phrase 24" 
  ]; 

  const card = document.getElementById("bingoCard");
  const shuffledPhrases = shuffleArray(phrases);

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
    // Move the event listener outside the conditional blocks
    cell.addEventListener("click", function() { 
      this.classList.toggle("selected");
      checkBingo();
    }); 
  }
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
  // Check rows, columns, and diagonals for 5 selected squares
  // (Implementation for this is left as an exercise)
  // If bingo is found, alert the user
}