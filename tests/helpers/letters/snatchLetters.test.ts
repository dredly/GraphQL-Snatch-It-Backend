import snatchLetters from '../../../helpers/letters/snatchLetters';
import { Word } from '../../../types';
import { testLetterPool } from '../../testData';

const snatchFromWord: Word = {
	id: '1',
	letters: [
		{id: '10', value: 'P', rotation: 0},
		{id: '11', value: 'I', rotation: 0},
		{id: '12', value: 'T', rotation: 0}
	]
};

describe('snatchLetters function', () => {
	it('Returns the correct letters for the word and remaining letters when called with valid input', () => {
		expect(snatchLetters('tapir', testLetterPool, snatchFromWord)).toEqual({
			letters: [
				{id: '12', value: 'T', rotation: 0},
				{id: '1', value: 'A', rotation: 0},
				{id: '10', value: 'P', rotation: 0},
				{id: '11', value: 'I', rotation: 0},
				{id: '8', value: 'R', rotation: 0},
			],
			remaining: [
				{id: '2', value: 'B', rotation: 0},
				{id: '3', value: 'C', rotation: 0},
				{id: '4', value: 'D', rotation: 0},
				{id: '5', value: 'E', rotation: 0},
				{id: '6', value: 'F', rotation: 0},
				{id: '7', value: 'F', rotation: 0},
				{id: '9', value: 'I', rotation: 0}
			]
		});
	});

	it('Throws an error if player tries to write a word with letter(s) which are unavailable', () => {
		expect(() => snatchLetters('piste', testLetterPool, snatchFromWord)).toThrowError('Letter not available');
	});

	it('Throws an error if the snatched word is not fully consumed', () => {
		expect(() => snatchLetters('pie', testLetterPool, snatchFromWord))
			.toThrowError('Did not fully use up letters from snatched word');
	});
});
