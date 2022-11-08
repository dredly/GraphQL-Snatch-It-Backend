import { getScore } from '../../helpers/getScores';

describe('getScore function', () => {
	it('Returns the number of words a player has if none of them are more than 3 letter', () => {
		expect(getScore(['hi', 'ye', 'to', 'on'])).toBe(4);
	});

	it('Returns the expected result for words where some have length greater than 3', () => {
		expect(getScore(['hi', 'stop', 'frigid'])).toBe(7);
	});

	it('Returns 0 for an empty list', () => {
		expect(getScore([])).toBe(0);
	});
});