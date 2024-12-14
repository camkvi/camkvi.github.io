function generateBoard() {

const englishPhrases = [
  "Lead has Christmas related name", "Mistletoe kiss", "Dead parent", "Cookie baking", "Green/red sweaters",
  "Small town setting", "Town with Christmas/winter name", "Old flame", "Crashes into love interest", "Love triangle",
  "Lead is in town temporarily", "Meddling family member", "Decorate tree together", "Christmas miracle", "Business about to go bankrupt",
  "Lead decides to stay in town", "Career-driven lead woman", "Lead goes through break-up", "Big city lead", "Cynical about Christmas",
  "Secret Santa", "Christmas Eve deadline", "Snowed in", "Ice skating scene", "Ugly Christmas sweater contest", 
  "Charity event", "Town Christmas pageant", "Caroling scene", "Santa Claus appearance", "Magical Christmas ornament" 
];

const norwegianPhrases = [
  "Hovedpersonen har et jule-relatert navn", "Misteltein-kyss", "Død forelder", "Kakebaking", "Grønne/røde gensere",
  "Liten by-setting", "By med jule/vinter-navn", "Gammel flamme", "Kræsjer inn i kjærlighetsinteressen", "Kjærlighetstrekant",
  "Hovedpersonen er midlertidig i byen", "Blandet familiemedlem", "Dekorerer juletre sammen", "Julemirakel", "Bedrift på randen av konkurs",
  "Hovedpersonen bestemmer seg for å bli i byen", "Karrieredrevet kvinnelig hovedperson", "Hovedpersonen går gjennom et brudd", "Storby-hovedperson", "Kynisk om jul",
  "Secret Santa", "Julaften-frist", "Snødd inne", "Skøytescene", "Stygg julegenser-konkurranse",
  "Veldedighetsarrangement", "Juleforestilling i byen", "Julekor-scene", "Julenissen møter opp", "Magisk julepynt"
];

let currentPhrases = englishPhrases; // Start with English phrases

  const card = document.getElementById("bingoCard");
  const shuffledPhrases = shuffleArray(currentPhrases);

  // Clear existing board
  card.innerHTML = ""; 

  // Generate rows and cells
  for (let i = 0; i < 5; i++) {
    const row = card.insertRow();
    for (let j = 0; j < 5; j++) {
      const cell = row.insertCell();
      if (i === 2 && j === 2) {
        cell.innerHTML = "Free Space";
        cell.classList.add("selected"); // Add this line to select the center cell
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
  // After generating the board, move the header and buttons to the top center:
  document.getElementById("myHeader").style.position = "relative";
  document.getElementById("myHeader").style.fontSize = "3em"; // Reset font size
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