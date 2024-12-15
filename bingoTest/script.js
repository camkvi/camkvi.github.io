                                                  // TEST VERSION


const englishPhrases = [
  "0 Lead has Christmas related name", "1 Mistletoe kiss", "2 Dead parent", "3 Cookie baking", "4 Green/red sweaters",
  "5 Small town setting", "6 Town with Christmas/winter name", "7 Old flame", "8 Crashes into love interest", "9 Love triangle",
  "10 Lead is in town temporarily", "11 Meddling family member", "12 Decorate tree together", "13 Christmas miracle", "14 Business about to go bankrupt",
  "15 Lead decides to stay in town", "16 Career-driven lead woman", "17 Lead goes through break-up", "18 Big city lead", "19 Cynical about Christmas",
  "20 Secret Santa", "21 Christmas Eve deadline", "22 Snowed in", "23 Ice skating scene", "24 Ugly Christmas sweater contest", 
  "25 Charity event", "26 Town Christmas pageant", "27 Caroling scene", "28 Santa Claus appearance", "29 Magical Christmas ornament" 
];

const norwegianPhrases = [
  "0 Hovedpersonen har et jule-relatert navn", "1 Misteltein-kyss", "2 Død forelder", "3 Kakebaking", "4 Grønne/røde gensere",
  "5 Liten by-setting", "6 By med jule/vinter-navn", "7 Gammel flamme", "8 Kræsjer inn i kjærlighetsinteressen", "9 Kjærlighetstrekant",
  "10 Hovedpersonen er midlertidig i byen", "11 Blandet familiemedlem", "12 Dekorerer juletre sammen", "13 Julemirakel", "14 Bedrift på randen av konkurs",
  "15 Hovedpersonen bestemmer seg for å bli i byen", "16 Karrieredrevet kvinnelig hovedperson", "17 Hovedpersonen går gjennom et brudd", "18 Storby-hovedperson", "19 Kynisk om jul",
  "20 Secret Santa", "21 Julaften-frist", "22 Snødd inne", "23 Skøytescene", "24 Stygg julegenser-konkurranse",
  "25 Veldedighetsarrangement", "26 Juleforestilling i byen", "27 Julekor-scene", "28 Julenissen møter opp", "29 Magisk julepynt"
];

let currentPhrases = englishPhrases; // Start with English phrases


function generateBoard() {

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


function toggleLanguage() {
    currentPhrases = (currentPhrases == englishPhrases) ? norwegianPhrases : englishPhrases;
    generateBoard();
}



function generateSpecificBoard(boardNumber) {
  if (boardNumber < 1 || boardNumber > 50) {
    alert("Invalid board number. Please enter a number between 1 and 50.");
    return;
  }

  const card = document.getElementById("bingoCard");
  card.innerHTML = ""; // Clear existing board


  const seed = boardNumber;
  const rng = new Math.seedrandom(seed);


  let phraseIndices = [];
  while (phraseIndices.length < 24) {
    let index = Math.floor(rng() * currentPhrases.length);
    if (!phraseIndices.includes(index)) {
      phraseIndices.push(index);
    }
  }

  // Generate rows and cells
  let index = 0;
  for (let i = 0; i < 5; i++) {
    const row = card.insertRow();
    for (let j = 0; j < 5; j++) {
      const cell = row.insertCell();
      if (i === 2 && j === 2) {
        cell.innerHTML = "Free Space";
        cell.classList.add("selected");
      } else {
        cell.innerHTML = currentPhrases[phraseIndices[index++]];
        cell.addEventListener("click", function() {
          this.classList.toggle("selected");
          checkBingo();
        });
      }
    }
  }
}