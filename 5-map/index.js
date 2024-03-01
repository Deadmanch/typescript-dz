var MyMap = /** @class */ (function () {
    function MyMap() {
        this.buckets = new Array(10);
    }
    MyMap.prototype.hash = function (key) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash = (hash * 31 + key.charCodeAt(i)) % this.buckets.length;
        }
        return hash;
    };
    MyMap.prototype.set = function (key, value) {
        var hash = this.hash(key);
        var index = hash;
        var newBucket = { hash: hash, key: key, value: value };
        if (!this.buckets[index]) {
            this.buckets[index] = newBucket;
        }
        else {
            var current = this.buckets[index];
            while (current === null || current === void 0 ? void 0 : current.next) {
                current = current.next;
            }
            if (current) {
                current.next = newBucket;
            }
            else {
                this.buckets[index] = newBucket;
            }
        }
    };
    MyMap.prototype.get = function (key) {
        var index = this.hash(key);
        var current = this.buckets[index];
        while (current) {
            if (current.key === key) {
                return current.value;
            }
            current = current.next;
        }
        return undefined;
    };
    MyMap.prototype.delete = function (key) {
        var index = this.hash(key);
        var current = this.buckets[index];
        var prev = undefined;
        while (current) {
            if (current.key === key) {
                if (prev) {
                    prev.next = current.next;
                }
                else {
                    this.buckets[index] = current.next;
                }
                return;
            }
            prev = current;
            current = current.next;
        }
    };
    MyMap.prototype.clear = function () {
        this.buckets = new Array(this.buckets.length);
    };
    MyMap.prototype.getBuckets = function () {
        return this.buckets.filter(function (bucket) { return bucket != undefined; });
    };
    return MyMap;
}());
var map = new MyMap();
map.set('London', '+25');
map.set('ab', '+20');
map.set('ba', '-10');
console.log(map.getBuckets());
console.log(map.get('Berlin'));
console.log(map.get('London'));
map.delete('Berlin');
console.log(map.get('Berlin'));
map.clear();
console.log(map.getBuckets());
