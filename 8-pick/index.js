var user = {
    name: 'Vasiliy',
    age: 8,
    skills: ['typescript', 'javascript'],
};
var user2 = {
    name: 'Dan',
    age: 28,
    skills: ['typescript', 'javascript', 'html/css', 'node'],
};
var pickObjectKeys = function (obj, keys) {
    var pickedObj = {};
    keys.forEach(function (key) {
        pickedObj[key] = obj[key];
    });
    return pickedObj;
};
var res2 = pickObjectKeys(user2, ['name', 'skills']);
var res1 = pickObjectKeys(user, ['age', 'skills']);
console.log(res1);
console.log(res2);
