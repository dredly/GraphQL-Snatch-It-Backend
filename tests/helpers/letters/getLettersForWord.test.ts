import { testLetterPool } from '../../testData';
import getLettersForWord from '../../../helpers/letters/getLettersForWord';

describe('getLettersForWord function', () => {
	it('Returns the letters for the word and the remaining word when given valid input', () => {
		expect(getLettersForWord('riff', testLetterPool)).toEqual({
			letters: [
				{id: '8', value: 'R', rotation: 0},
				{id: '9', value: 'I', rotation: 0},
				{id: '6', value: 'F', rotation: 0},
				{id: '7', value: 'F', rotation: 0},
			],
			remaining: [
				{id: '1', value: 'A', rotation: 0},
				{id: '2', value: 'B', rotation: 0},
				{id: '3', value: 'C', rotation: 0},
				{id: '4', value: 'D', rotation: 0},
				{id: '5', value: 'E', rotation: 0},
			],
		});    
	});
	describe('Throws an error if the letters are not available in the letter pool', () => {
		expect(() => getLettersForWord('amedeo', testLetterPool)).toThrowError('Not all letters available');
	});
});
