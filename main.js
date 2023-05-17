import { getNextBoard, renderBoard } from './src/board.js';
import { getFood } from './src/food.js';
import { Snake } from './src/snake.js';

/**
 * @param {string} eventKey
 * @param {Direction} currentDirection
 */
function getNewDirection(eventKey, currentDirection) {
	if (eventKey === 'ArrowRight' && currentDirection !== 'left') return 'right';
	if (eventKey === 'ArrowLeft' && currentDirection !== 'right') return 'left';
	if (eventKey === 'ArrowUp' && currentDirection !== 'down') return 'up';
	if (eventKey === 'ArrowDown' && currentDirection !== 'up') return 'down';
	return currentDirection;
}

/** @param {number} speed */
function getTickTimeout(speed) {
	return Math.max(510 - speed * 10, 10);
}

/**
 * @param {Coordinates} bounds
 * @param {Coordinates} food
 * @param {Snake} snake
 * @param {{current: Direction, next: Direction}} direction
 */
function nextTick(bounds, food, snake, direction, timeout = 500) {
	setTimeout(() => {
		direction.current = direction.next;
		const { valid, eaten } = snake.move(direction.current, food);
		if (eaten) food = getFood(bounds, snake);
		if (!valid) return alert('You lost');

		const board = getNextBoard(bounds, snake, food);
		renderBoard(board);

		nextTick(bounds, food, snake, direction, getTickTimeout(snake.body.length));
	}, timeout);
}

function main() {
	const bounds = { x: 25, y: 25 };
	const snake = new Snake(bounds);
	let food = getFood(bounds, snake);

	/** @type {{current: Direction, next: Direction}} */
	const direction = { current: 'right', next: 'right' };
	window.addEventListener('keydown', (event) => {
		direction.next = getNewDirection(event.key, direction.current);
	});

	nextTick(bounds, food, snake, direction);
}

main();
