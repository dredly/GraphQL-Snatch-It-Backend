const getScore = (wordStrings: string[]): number => {
	if (!wordStrings.length) {
		return 0;
	}
	const excessLetters = wordStrings  
		.map(ws => ws.substring(3))
		.reduce((a, b) => a + b);
	return wordStrings.length + excessLetters.length;
};

export default getScore;