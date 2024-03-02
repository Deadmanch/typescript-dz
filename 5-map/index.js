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
            var currentBucket = this.buckets[index];
            while (currentBucket === null || currentBucket === void 0 ? void 0 : currentBucket.next) {
                currentBucket = currentBucket.next;
            }
            if (currentBucket) {
                currentBucket.next = newBucket;
            }
            else {
                this.buckets[index] = newBucket;
            }
        }
    };
    MyMap.prototype.get = function (key) {
        var index = this.hash(key);
        var currentBucket = this.buckets[index];
        while (currentBucket) {
            if (currentBucket.key === key) {
                return currentBucket.value;
            }
            currentBucket = currentBucket.next;
        }
        return undefined;
    };
    MyMap.prototype.delete = function (key) {
        var index = this.hash(key);
        var currentBucket = this.buckets[index];
        var prevBucket = undefined;
        while (currentBucket) {
            if (currentBucket.key === key) {
                if (prevBucket) {
                    prevBucket.next = currentBucket.next;
                }
                else {
                    this.buckets[index] = currentBucket.next;
                }
                return;
            }
            prevBucket = currentBucket;
            currentBucket = currentBucket.next;
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
console.log(map.get('London'));
console.log(map.get('ba'));
console.log(map.get('ab'));
map.delete('London');
console.log(map.get('London'));
map.clear();
console.log(map.getBuckets());
