import snatchLetters from '../../../helpers/letters/snatchLetters';
import { Word } from '../../../types';
import { testLetterPool } from '../../testData';

const snatchFromWord: Word = {
	id: '1',
	letters: [
		{id: '10', value: 'P'},
		{id: '11', value: 'I'},
		{id: '12', value: 'T'}
	]
};

describe('snatchLetters function', () => {
	it('Returns the correct letters for the word and remaining letters when called with valid input', () => {
		expect(snatchLetters('tapir', testLetterPool, snatchFromWord)).toEqual({
			letters: [
				{id: '12', value: 'T'},
				{id: '1', value: 'A'},
				{id: '10', value: 'P'},
				{id: '11', value: 'I'},
				{id: '8', value: 'R'},
			],
			remaining: [
				{id: '2', value: 'B'},
				{id: '3', value: 'C'},
				{id: '4', value: 'D'},
				{id: '5', value: 'E'},
				{id: '6', value: 'F'},
				{id: '7', value: 'F'},
				{id: '9', value: 'I'}
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
