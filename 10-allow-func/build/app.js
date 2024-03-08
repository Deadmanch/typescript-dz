"use strict";
/*
    Написать декоратор который при присвоении проверяет присваиваемое значение
    функцией. Если она возвращает true - присвоение происходит, если false то нет и выводит ошибку что нельзя присвоить значение меньше заданного(динамически)
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class User1 {
    constructor() {
        this.age = 30;
    }
}
__decorate([
    allowFunc((a) => a > 18),
    __metadata("design:type", Number)
], User1.prototype, "age", void 0);
function allowFunc(func) {
    return (target, propertyKey) => {
        let value = target[propertyKey];
        Object.defineProperty(target, propertyKey, {
            get: () => value,
            set: newValue => {
                if (func(newValue)) {
                    value = newValue;
                }
                else {
                    console.error(`Ошибка: нельзя присвоить значение ${newValue} в свойство ${String(propertyKey)}. Разрешенные значения - ${String(func)}`);
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
