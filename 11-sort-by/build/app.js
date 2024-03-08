"use strict";
const sortBy = require('sort-by');
const users = [
    {
        id: 7,
        name: 'Foo',
        age: '34',
        email: { primary: 'foo@email.com' },
    },
    {
        id: 3,
        name: 'Baz',
        age: '67',
        email: { primary: 'baz@email.com' },
    },
    {
        id: 4,
        name: 'Bar',
        age: '67',
        email: { primary: 'bar@email.com' },
    },
];
console.log(users.sort(sortBy('name', 'age')));
console.log(users.sort(sortBy('-id', 'name')));
console.log(users.sort(sortBy('age', 'email.primary')));
