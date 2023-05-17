import { Snake } from './snake.js';

/**
 * @param {Coordinates} param0
 * @returns {Board}
 */
function createBoard({ x, y }) {
	const board = new Array(y).fill(0).map(() => new Array(x).fill('empty'));
	return board;
}

/** @param {Board} board */
export function renderBoard(board) {
	const boardContainer = document.querySelector('#board-container');
	if (!boardContainer) throw new Error('boardContainer div not found in document');

	board.forEach((row, idx) => {
		const rowDiv = document.createElement('div');
		rowDiv.id = `row-${idx}`;
		rowDiv.classList.add('row');

		row.forEach((tile) => {
			const tileDiv = document.createElement('div');
			tileDiv.classList.add('tile', tile);
			rowDiv.append(tileDiv);
		});

		const previousRow = document.querySelector(`#row-${idx}`);
		previousRow ? previousRow.replaceWith(rowDiv) : boardContainer.append(rowDiv);
	});
}

/**
 * @param {Snake} snake
 * @param {Coordinates} bounds
 * @param {Coordinates} food
 * @returns {Board}
 */
export function getNextBoard(bounds, snake, food) {
	const board = createBoard(bounds);
	board[food.y][food.x] = 'food';
	snake.body.forEach((segment) => {
		board[segment.y][segment.x] = 'snake';
	});

	return board;
}
