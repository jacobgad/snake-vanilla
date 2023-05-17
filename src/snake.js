export class Snake {
	/** @param {Coordinates} bounds */
	constructor(bounds) {
		this.bounds = bounds;
		this.body = [
			{ x: 7, y: 12 },
			{ x: 6, y: 12 },
			{ x: 5, y: 12 },
		];
	}

	/**
	 * @param {Direction} direction
	 * @param {Coordinates} food
	 * @returns {{valid: boolean, eaten: boolean}}
	 */
	move(direction, food) {
		const head = this.body[0];
		const newHead = getNewHead(head, direction);
		if (!isWithinBounds(newHead, this.bounds)) return { valid: false, eaten: false };
		if (isSelfCollision(newHead, this.body)) return { valid: false, eaten: false };
		this.body.unshift(newHead);

		if (head.x === food.x && head.y === food.y) return { valid: true, eaten: true };
		this.body.pop();
		return { valid: true, eaten: false };
	}
}

/**
 * @param {Coordinates} head
 * @param {Coordinates} bounds
 * @returns {boolean}
 */
function isWithinBounds(head, bounds) {
	if (head.x < 0 || head.x >= bounds.x) return false;
	if (head.y < 0 || head.y >= bounds.y) return false;
	return true;
}

/**
 * @param {Coordinates} head
 * @param {Direction} direction
 * @returns {Coordinates}
 */
function getNewHead(head, direction) {
	if (direction === 'left') return { x: head.x - 1, y: head.y };
	if (direction === 'right') return { x: head.x + 1, y: head.y };
	if (direction === 'up') return { x: head.x, y: head.y - 1 };
	if (direction === 'down') return { x: head.x, y: head.y + 1 };
	throw new Error('Direction not valid');
}

/**
 * @param {Coordinates} newHead
 * @param {Snake['body']} body
 */
function isSelfCollision(newHead, body) {
	const collision = body.find((segment) => segment.x === newHead.x && segment.y === newHead.y);
	if (collision) return true;
	return false;
}
