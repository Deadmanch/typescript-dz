interface IBucket<T> {
	hash: number;
	key: string;
	value: T;
	next?: IBucket<T>;
}

class MyMap<T> {
	private buckets: (IBucket<T> | undefined)[] = new Array(10);

	private hash(key: string): number {
		let hash = 0;
		for (let i = 0; i < key.length; i++) {
			hash = (hash * 31 + key.charCodeAt(i)) % this.buckets.length;
		}
		return hash;
	}
	set(key: string, value: any): void {
		const hash = this.hash(key);
		const index = hash;
		const newBucket: IBucket<T> = { hash, key, value };

		if (!this.buckets[index]) {
			this.buckets[index] = newBucket;
		} else {
			let currentBucket: IBucket<T> | undefined = this.buckets[index];

			while (currentBucket?.next) {
				currentBucket = currentBucket.next;
			}

			if (currentBucket) {
				currentBucket.next = newBucket;
			} else {
				this.buckets[index] = newBucket;
			}
		}
	}

	get(key: string): any {
		const index = this.hash(key);
		let currentBucket: IBucket<T> | undefined = this.buckets[index];

		while (currentBucket) {
			if (currentBucket.key === key) {
				return currentBucket.value;
			}
			currentBucket = currentBucket.next;
		}

		return undefined;
	}
	delete(key: string): void {
		const index = this.hash(key);
		let currentBucket: IBucket<T> | undefined = this.buckets[index];
		let prevBucket: IBucket<T> | undefined = undefined;

		while (currentBucket) {
			if (currentBucket.key === key) {
				if (prevBucket) {
					prevBucket.next = currentBucket.next;
				} else {
					this.buckets[index] = currentBucket.next;
				}
				return;
			}
			prevBucket = currentBucket;
			currentBucket = currentBucket.next;
		}
	}
	clear(): void {
		this.buckets = new Array(this.buckets.length);
	}

	getBuckets(): (IBucket<T> | undefined)[] {
		return this.buckets.filter(bucket => bucket != undefined);
	}
}
const map = new MyMap();

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
