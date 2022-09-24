import { generateLetters } from '../letters';

test('generateLetters function', () => {
	expect(generateLetters('AAAABC')).toHaveLength(6);
});