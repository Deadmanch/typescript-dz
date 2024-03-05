var obj = {
    a: 1,
    b: 2,
};
var swapKeysAndValues = function (obj) {
    var swapObj = {};
    for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        swapObj[value] = key;
    }
    return swapObj;
};
var res = swapKeysAndValues(obj);
console.log(res);
