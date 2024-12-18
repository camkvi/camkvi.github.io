										// PHRASES
const englishPhrases = [
  "Lead has Christmas related name", "Mistletoe kiss", "Dead parent", "Cookie baking", "Green/red sweaters",
  "Small town setting", "Town with Christmas/winter name", "Old flame", "Crashes into love interest", "Love triangle",
  "Lead is in town temporarily", "Meddling family member", "Decorate tree together", "Christmas miracle", "Business about to go bankrupt",
  "Lead decides to stay in town", "Career-driven lead woman", "Lead goes through break-up", "Big city lead", "Cynical about Christmas",
  "Secret Santa", "Christmas Eve deadline", "Snowed in", "Ice skating scene", "Amnesia", 
  "Charity event", "Precocious child", "Caroling scene", "Santa Claus appearance", "Magical Christmas ornament",
  "First snow of the season", "Big misunderstanding", "Hot cocoa", "Lead is widowed", "Lead is a single parent",
  "Childhood friends", "Diner scene", "Love at first sight", "Dislike at first sight", "Clumsy"
];

const norwegianPhrases = [
  "Hovedpersonen har et julete navn", "Kyss under Misteltein", "Død forelder", "Julekakebaking", "Grønne/røde gensere",
  "Handling satt til liten by", "By med jule-/vinternavn", "Gammel flamme", "Kræsjer inn i den utkårede", "Love triangle",
  "Hovedpersonen er midlertidig i byen", "Innblanding fra familiemedlem", "Pynter juletreet sammen", "Julemirakel", "Bedrift på randen av konkurs ",
  "Hovedpersonen bestemmer seg for å bli i byen", "Karrieredrevet kvinnelig hovedperson", "Hovedpersonen går gjennom et brudd", "Hovedperson er storbymenneske", "Kynisk syn på julen",
  "Secret santa", "Frist på julaften", "Snødd inne", "Skøytescene", "Hukommelsestap",
  "Veldedighets- arrangement", "Veslevoksent barn", "Julekor-scene", "Julenissen dukker opp", "Magisk julepynt",
  "Vinterens første snø", "Stor misforståelse", "Varm kakao", "Hovedperson er enke/ enkemann", "Hovenperson er aleneforelder", 
  "Barndomsvenner", "Scene på en diner", "Kjærlinget ved første blikk", "Forakt ved første blikk", "Klumsete"
];

let currentPhrases = englishPhrases; // Start with English phrases
let phraseIndices = []; // Store the generated phrase indices, global variable

										// GENERATE RANDOM BOARD
function generateBoard() {
  const rng = new Math.seedrandom(); // Use a random seed for generateBoard()
  const phraseIndices = generatePhraseIndices(rng); // Generate indices
  createBoard(phraseIndices); // Create the board with the indices
}

										// GENERATE SPECIFIC BOARD
function generateSpecificBoard(boardNumber) {
  if (boardNumber < 1 || boardNumber > 50) {
    alert("Invalid board number. Please enter a number between 1 and 50.");
    return;
  }

  const rng = new Math.seedrandom(boardNumber);
  const phraseIndices = generatePhraseIndices(rng);
  createBoard(phraseIndices);
}


										// FUNCTION TO GENERATE PHRASE INDICES 
function generatePhraseIndices(rng) {
  let phraseIndices = [];
  while (phraseIndices.length < 24) {
    let index = Math.floor(rng() * currentPhrases.length);
    if (!phraseIndices.includes(index)) {
      phraseIndices.push(index);
    }
  }
  return phraseIndices;
}

										// FUNCTION TO CREATE THE BOARD WITH GIVEN PHRASE INDICES
function createBoard(phraseIndices) {
  const card = document.getElementById("bingoCard");

  // Clear the table contents
  while (card.firstChild) {
    card.removeChild(card.firstChild);
  }

  // Generate rows and cells
  let index = 0;
  for (let i = 0; i < 5; i++) {		// create 5 rows
    const row = card.insertRow();
    for (let j = 0; j < 5; j++) {	// create 5 columns, add phrases
      const cell = row.insertCell();
      if (i === 2 && j === 2) {
        cell.innerHTML = "Free Space";
        cell.classList.add("selected");		// select the free space from the start
      } else {
        cell.innerHTML = currentPhrases[phraseIndices[index++]];	// add next phrase in phraseIndices
      }  
      cell.addEventListener("click", function() {			// check for bingo every time a cell is selected
          this.classList.toggle("selected");
          checkBingo();
        });
    }
  }
} 

function checkBingo() {								// CHECK FOR BINGO	
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


function toggleLanguage() {  
  currentPhrases = (currentPhrases === englishPhrases) ? norwegianPhrases : englishPhrases;

  const card = document.getElementById("bingoCard");
  const cells = card.getElementsByTagName("td");

  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === "Free Space") continue; // Skip Free Space

    // Find the corresponding phrase index by matching content in the old phrases
    const currentPhrase = cells[i].innerHTML;
    let index = englishPhrases.indexOf(currentPhrase);
    if (index === -1) {
      index = norwegianPhrases.indexOf(currentPhrase); // If not in English, check Norwegian
    }

    // Update the cell content using the new phrases
    if (index !== -1) {
      cells[i].innerHTML = currentPhrases[index];
    }
  }
}


// ... your existing JavaScript code ...

// Call generateBoard() when the page loads
window.onload = function() {
  generateBoard(); 
};

