export const setDifference = <T>(a: Set<T>, b: Set<T>) =>  {
	return Array.from(a).filter(item => !b.has(item));
};

export const selectRandomElement = <T>(arr: Array<T>) => {
	return arr[Math.floor(Math.random() * arr.length)];
};