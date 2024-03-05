type SwapObjectType = Record<number, string>;
type ObjectType = Record<string, number>;

const obj: ObjectType = {
	a: 1,
	b: 2,
};

const swapKeysAndValues = <T extends ObjectType>(obj: T): SwapObjectType => {
	const swapObj: SwapObjectType = {};

	for (const [key, value] of Object.entries(obj)) {
		swapObj[value] = key;
	}
	return swapObj;
};
const res = swapKeysAndValues(obj);
console.log(res);
