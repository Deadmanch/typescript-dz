/*
	Написать декоратор который при присвоении проверяет присваиваемое значение
	функцией. Если она возвращает true - присвоение происходит, если false то нет и выводит ошибку что нельзя присвоить значение меньше заданного(динамически)
*/

class User1 {
	@allowFunc((a: number) => a > 18)
	age: number = 30;
}
function allowFunc(func: (value: number) => boolean) {
	return (target: any, propertyKey: string | symbol): void => {
		let value = target[propertyKey];

		Object.defineProperty(target, propertyKey, {
			get: () => value,
			set: newValue => {
				if (func(newValue)) {
					value = newValue;
				} else {
					console.error(
						`Ошибка: нельзя присвоить значение ${newValue} в свойство ${String(
							propertyKey
						)}. Разрешенные значения - ${String(func)}`
					);
				}
			},
		});
	};
}
const person = new User1();

console.log(person.age);
person.age = 0;
console.log(person.age);
person.age = 17;
person.age = 21;
console.log(person.age);
