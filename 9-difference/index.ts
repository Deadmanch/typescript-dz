interface IA {
	a: number;
	b: string;
	c: boolean;
}

interface IB {
	a: number;
}

let objA: IA = { a: 5, b: '', c: false };
let objB: IB = { a: 10 };

const difference = <A extends Record<string, any>, B extends Record<string, any>>(
	obj1: A,
	obj2: B
): Omit<A, keyof B> => {
	const res = { ...obj1 };

	for (const key of Object.keys(obj2)) {
		delete res[key];
	}
	return res;
};

const a0 = difference(objA, objB);

console.log(a0);
