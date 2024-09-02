let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let turnO = true;
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let line = document.querySelector(".line");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  line.style.width = "0";
  msgContainer.classList.add("hide");
};

const showWinner = (winner, pattern) => {
  msg.innerText = `Congratulations! Player ${winner} is the winner!`;
  msgContainer.classList.remove("hide");
  resetBtn.classList.add("hide");
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let post1Val = boxes[pattern[0]].innerText;
    let post2Val = boxes[pattern[1]].innerText;
    let post3Val = boxes[pattern[2]].innerText;
    if (post1Val !== "" && post2Val !== "" && post3Val !== "") {
      if (post1Val === post2Val && post2Val === post3Val) {
        disableBoxes();
        showWinner(post1Val, pattern);
        break;
      }
    }
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // Player O
      box.innerText = "O";
      turnO = false;
    } else {
      // Player X
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
