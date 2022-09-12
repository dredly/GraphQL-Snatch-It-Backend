import { Player } from '../../types';
import findPlayerByWordIdAction from '../../actions/findPlayerByWordId';

// Not actually concerned about letters as we are using ids,
// so leave as blank list
const testPlayerList: Player[] = [
	{
		name: 'Miguel',
		id: '1',
		ready: true,
		words: [
			{
				id: '1',
				letters: []
			},
			{
				id: '2',
				letters: []
			},
			{
				id: '3',
				letters: []
			}
		]
	},
	{
		name: 'Amedeo',
		id: '2',
		ready: true,
		words: [
			{
				id: '4',
				letters: []
			},
			{
				id: '5',
				letters: []
			},
			{
				id: '6',
				letters: []
			}
		]
	}
];

test('findPlayerByWordIdAction function', () => {
	expect(findPlayerByWordIdAction(testPlayerList, '4')).toEqual(testPlayerList[1]);
	expect(findPlayerByWordIdAction(testPlayerList, '2')).toEqual(testPlayerList[0]);
	expect(() => findPlayerByWordIdAction(testPlayerList, '7')).toThrowError();
});