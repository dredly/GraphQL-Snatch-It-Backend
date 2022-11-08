import { Word } from '../../types';

const getWordString = (word: Word) => {
	return word.letters.map(lett => lett.value.toLowerCase()).join('');
};

export default getWordString;