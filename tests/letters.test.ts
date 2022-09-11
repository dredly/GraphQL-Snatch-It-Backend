import { generateLetters, getLettersForWord, snatchLetters } from '../letters';
import { Letter, Word } from '../types';

const testLetterPool: Letter[] = [
	{id: '1', value: 'A'},
	{id: '2', value: 'B'},
	{id: '3', value: 'C'},
	{id: '4', value: 'D'},
	{id: '5', value: 'E'},
	{id: '6', value: 'F'},
	{id: '7', value: 'F'},
	{id: '8', value: 'R'},
	{id: '9', value: 'I'}
];

const testWord: Word = {
	id: '1',
	letters: [
		{id: '10', value: 'R'},
		{id: '11', value: 'A'},
		{id: '12', value: 'T'}
	]
};

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

test('snatchLetters function', () => {
	expect(snatchLetters('barter', testLetterPool, testWord)).toEqual({
		word: [
			{id: '2', value: 'B'},
			{id: '11', value: 'A'},
			{id: '10', value: 'R'},
			{id: '12', value: 'T'},
			{id: '5', value: 'E'},
			{id: '8', value: 'R'},
		],
		remaining: [
			{id: '1', value: 'A'},
			{id: '3', value: 'C'},
			{id: '4', value: 'D'},
			{id: '6', value: 'F'},
			{id: '7', value: 'F'},
			{id: '9', value: 'I'}
		]
	});

	expect(() => snatchLetters('encyclopedia', testLetterPool, testWord)).toThrowError();
});