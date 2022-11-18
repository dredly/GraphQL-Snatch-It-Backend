import { getScore } from '../../helpers/getScores';
import getScores from '../../helpers/getScores';
import { threePlayersTwoWordsEach } from '../testData';

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

describe('getScores function', () => {
	it('Returns the correct scores for each player, sorted from highest to lowest', () => {
		expect(getScores(threePlayersTwoWordsEach, getScore)).toEqual([
			{
				id: 'p3',
				score: 10
			},
			{
				id: 'p1',
				score: 3
			},
			{
				id: 'p2',
				score: 2
			}
		]);
	});
});