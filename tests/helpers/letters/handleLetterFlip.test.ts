import { testGame } from '../../testData';
import handleLetterFlip from '../../../helpers/letters/handleLetterFlip';

describe('handleLetterFlip function', () => {
	it('Correctly returns the updated game when called with valid input', () => {
		const testTimers = new Map<string, NodeJS.Timeout>();
		const updatedGame = handleLetterFlip(testGame, testTimers);
		expect(updatedGame.letters.flipped)
			.toHaveLength(testGame.letters.flipped.length + 1);
		expect(updatedGame.letters.unflipped)
			.toHaveLength(testGame.letters.unflipped.length - 1);
		expect(updatedGame.players.filter(p => !p.ready)).toHaveLength(updatedGame.players.length);
		clearInterval(testTimers.get(testGame.id));
	});
});