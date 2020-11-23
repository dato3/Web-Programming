const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

const xSymbol = '×';
const oSymbol = '○';

let gameIsLive = true;
let xIsNext = true;

function random(mn, mx) {  
    return Math.random() * (mx - mn) + mn;  
} 

const letterToSymbol = (letter) => letter === 'X' ? xSymbol : oSymbol;

const handleWin = (letter) => {
	gameIsLive = false;
	statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`;
}

const checkGameStatus = () => {
	const topLeft = cellDivs[0].classList[1];
	const topMiddle = cellDivs[1].classList[1];
	const topRight = cellDivs[2].classList[1];
	const middleLeft = cellDivs[3].classList[1];
	const middleMiddle = cellDivs[4].classList[1];
	const middleRight = cellDivs[5].classList[1];
	const bottomLeft = cellDivs[6].classList[1];
	const bottomMiddle = cellDivs[7].classList[1];
	const bottomRight = cellDivs[8].classList[1];

	if (topLeft && topLeft === topMiddle && topLeft === topRight) {
		handleWin(topLeft);
		cellDivs[0].classList.add('won');
		cellDivs[1].classList.add('won');
		cellDivs[2].classList.add('won');
	} else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
		handleWin(middleLeft);
		cellDivs[3].classList.add('won');
		cellDivs[4].classList.add('won');
		cellDivs[5].classList.add('won');
	} else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
		handleWin(bottomLeft);
		cellDivs[6].classList.add('won');
		cellDivs[7].classList.add('won');
		cellDivs[8].classList.add('won');
	} else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
		handleWin(topLeft);
		cellDivs[0].classList.add('won');
		cellDivs[3].classList.add('won');
		cellDivs[6].classList.add('won');
	} else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
		handleWin(topMiddle);
		cellDivs[1].classList.add('won');
		cellDivs[4].classList.add('won');
		cellDivs[7].classList.add('won');
	} else if (topRight && topRight === middleRight && topRight === bottomRight) {
		handleWin(topRight);
		cellDivs[2].classList.add('won');
		cellDivs[5].classList.add('won');
		cellDivs[8].classList.add('won');
	} else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
		handleWin(topLeft);
		cellDivs[0].classList.add('won');
		cellDivs[4].classList.add('won');
		cellDivs[8].classList.add('won');
	} else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
		handleWin(topRight);
		cellDivs[2].classList.add('won');
		cellDivs[4].classList.add('won');
		cellDivs[6].classList.add('won');
	} else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
		gameIsLive = false;
		statusDiv.innerHTML = 'Game is tied!';
	} else {
		if (xIsNext) {
			statusDiv.innerHTML = `${xSymbol} is next`;
		} else {
			statusDiv.innerHTML = `${oSymbol} is next`;
		}
	}
};

const nextTurn = () => {
	let available = [];
	for (let i = 0; i < 9; i++) {
		if (!cellDivs[i].classList[1]) {
			available.push(cellDivs[i]);
		}
	}
	let index = Math.floor(random(0, available.length));
	let move = available[index];
	if (Array.isArray(available) && available.length) {
		move.classList.add('O');
		xIsNext = !xIsNext;
		checkGameStatus();
	} else {
		gameIsLive = false;
	}
}

const handleReset = () => {
	xIsNext = true;
	statusDiv.innerHTML = `${xSymbol} is next`;
	for (const cellDiv of cellDivs) {
		cellDiv.classList.remove('X');
		cellDiv.classList.remove('O');
		cellDiv.classList.remove('won');
	}
	gameIsLive = true;
};
const handleCellClick = (e) => {
	const classList = e.target.classList;
	const location = e.target.classList[1];
	if (!gameIsLive || classList[1] == 'X' || classList[1] == 'O' || xIsNext == false) {
		return;
	}
	classList.add('X');
	xIsNext = !xIsNext;
	checkGameStatus();
	if (gameIsLive) {
		setTimeout(() => { nextTurn(); }, 1000);
	}
};

resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
	cellDiv.addEventListener('click', handleCellClick);
}
