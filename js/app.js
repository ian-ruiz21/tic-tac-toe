/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

]

    // 0 1 2
    // 3 4 5
    // 6 7 8

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

let squareEls = document.querySelectorAll('.sqr');
let messageEl = document.querySelector('h2');
let resetBtnEl = document.getElementById('reset');

console.log(squareEls);
console.log(messageEl);

/*-------------------------------- Functions --------------------------------*/
init();

function init(){
    board = [
        "", /* cell 0 */ 
        "", /* cell 1 */ 
        "", /* cell 2 */
        "", /* cell 3 */
        "", /* cell 4 */
        "", /* cell 5 */
        "", /* cell 6 */
        "", /* cell 7 */
        "", /* cell 8 */
    ];
    turn = 'X';
    winner = false;
    tie = false;
    render();
}

function updateBoard() {
    board.forEach((cellValue, index) => {
        const squareEl = squareEls[index];
        if (cellValue === 'X') {
            squareEl.textContent = 'X';
            squareEl.style.color = 'red';
            squareEl.style.backgroundColor = 'lightblue';
          } else if (cellValue === 'O') {
            squareEl.textContent = 'O';
            squareEl.style.color = 'blue';
            squareEl.style.backgroundColor = 'lightgreen';
          } else {
            squareEl.textContent = '';
            squareEl.style.color = 'black';
            squareEl.style.backgroundColor = 'white';
          }
          
    });
}

function handleClick(event) {
    console.log(event.target.id);
    const cellIdx = event.target.id;

    if(winner) {
        return;
    }
    if(board[cellIdx] !== ''){
        return;
    }
    placePiece(cellIdx);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function checkForWinner() {
    for(let i=0; i < winningCombos.length; i++){
        const [a, b, c] = winningCombos[i];

        if (board[a] !== ''){
            if(board[a] === board[b] && board[a] === board[c]) {
                winner = true;
            }
        }
    }
}

function checkForTie() {
    if(winner) return;

    if(board.includes('')) {
        tie = false;
    } else {
        tie = true
    }
}

function placePiece(index) {
    board[index] = turn;
}

function switchPlayerTurn() {
    if(winner) return;

    if(!winner){
        if(turn === 'X'){
            turn = 'O';
        } else {
            turn = 'X';
        }
    }
    
}

function updateMessage() {
    if(winner === false && tie ===false){
        messageEl.innerText = `${turn}'s turn`;
    } else if(winner === false && tie === true){
        messageEl.innerText = 'Tie!';
    } else {
        messageEl.innerText = `${turn} wins!`;
    }
}

function render(){
    updateBoard();
    updateMessage();
}

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((squareEl) => {
    squareEl.addEventListener("click", handleClick);
});

resetBtnEl.addEventListener("click", init);