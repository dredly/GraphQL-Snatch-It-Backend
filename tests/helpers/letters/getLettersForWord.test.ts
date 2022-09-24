import { testLetterPool } from '../../testData';
import getLettersForWord from '../../../helpers/letters/getLettersForWord';

describe('getLettersForWord function', () => {
	it('Returns the letters for the word and the remaining word when given valid input', () => {
		expect(getLettersForWord('riff', testLetterPool)).toEqual({
			letters: [
				{id: '8', value: 'R'},
				{id: '9', value: 'I'},
				{id: '6', value: 'F'},
				{id: '7', value: 'F'},
			],
			remaining: [
				{id: '1', value: 'A'},
				{id: '2', value: 'B'},
				{id: '3', value: 'C'},
				{id: '4', value: 'D'},
				{id: '5', value: 'E'},
			],
		});    
	});
	describe('Throws an error if the letters are not available in the letter pool', () => {
		expect(() => getLettersForWord('amedeo', testLetterPool)).toThrowError('Not all letters available');
	});
});
