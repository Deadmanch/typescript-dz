type UserType = {
	name: string;
	age: number;
	skills: string[];
};
const user: UserType = {
	name: 'Vasiliy',
	age: 8,
	skills: ['typescript', 'javascript'],
};
const user2: UserType = {
	name: 'Dan',
	age: 28,
	skills: ['typescript', 'javascript', 'html/css', 'node'],
};
type PickedKeysType<T, K extends keyof T> = Partial<Record<K, T[K]>>;
const pickObjectKeys = <T, K extends keyof T>(obj: T, keys: K[]): PickedKeysType<T, K> => {
	const pickedObj: PickedKeysType<T, K> = {};

	keys.forEach(key => {
		pickedObj[key] = obj[key];
	});
	return pickedObj;
};
const res2 = pickObjectKeys(user2, ['name', 'skills']);
const res1 = pickObjectKeys(user, ['age', 'skills']);
console.log(res1);
console.log(res2);
