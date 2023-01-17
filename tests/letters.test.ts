import { generateLetters } from '../letters';

describe('generateLetters function', () => {
	it('Should generate one letter for each character in the input string', () => {
		expect(generateLetters('AAAABC')).toHaveLength(6);
	});
	it('Should randomise the rotation of the letters it generates', () => {
		const rotations = generateLetters('AAAAAAA').map(lett => lett.rotation);
		const numUnique = (new Set(rotations)).size;
		expect(numUnique).toBeGreaterThan(0);
	});
});