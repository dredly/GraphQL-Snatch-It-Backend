import { generateLetters, getLettersForWord } from '../letters';
import { Letter } from '../types';

const testLetterPool: Letter[] = [
	{
		id: '1', value: 'A'
	},
	{
		id: '2', value: 'B'
	},
	{
		id: '3', value: 'C'
	},
	{
		id: '4', value: 'D'
	},
	{
		id: '5', value: 'E'
	},
	{
		id: '6', value: 'F'
	},
	{
		id: '7', value: 'F'
	},
	{
		id: '8', value: 'R'
	},
	{
		id: '9', value: 'I'
	}
];

test('generateLetters function', () => {
	expect(generateLetters('AAAABC')).toHaveLength(6);
});

test('getLettersForWord function', () => {
	expect(getLettersForWord('riff', testLetterPool)).toEqual({
		word: [
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

	// Should not actually call function when testing to see if it throws an error
	// https://eloquentcode.com/expect-a-function-to-throw-an-exception-in-jest
	expect(() => getLettersForWord('amedeo', testLetterPool)).toThrowError();
});