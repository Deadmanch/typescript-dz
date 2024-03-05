var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var objA = { a: 5, b: '', c: false };
var objB = { a: 10 };
var difference = function (obj1, obj2) {
    var res = __assign({}, obj1);
    for (var _i = 0, _a = Object.keys(obj2); _i < _a.length; _i++) {
        var key = _a[_i];
        delete res[key];
    }
    return res;
};
var a0 = difference(objA, objB);
console.log(a0);
