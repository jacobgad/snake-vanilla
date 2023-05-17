import { Snake } from './snake.js';

/**
 * @param {Coordinates} bounds
 * @param {Snake} snake
 * @returns {Coordinates}
 */
export function getFood(bounds, snake) {
	const x = Math.floor(Math.random() * bounds.x);
	const y = Math.floor(Math.random() * bounds.y);
	const invalid = snake.body.find((segment) => segment.x === x && segment.y === y);
	if (!invalid) return { x, y };
	return getFood(bounds, snake);
}
