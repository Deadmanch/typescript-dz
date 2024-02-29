interface IBucket {
	hash: number;
	key: string;
	value: any;
	next?: IBucket;
}

class MyMap {
	private buckets: (IBucket | undefined)[] = new Array(10);

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
		const newBucket: IBucket = { hash, key, value, };

		if (!this.buckets[index]) {
			this.buckets[index] = newBucket;
		} else {
			let current: IBucket | undefined = this.buckets[index];

			while (current?.next) {
				current = current.next;
			}

			if (current) {
				current.next = newBucket;
			} else {
				this.buckets[index] = newBucket;
			}
		}
	}


	get(key: string): any {
		const index = this.hash(key);
		let current: IBucket | undefined = this.buckets[index];

		while (current) {
			if (current.key === key) {
				return current.value;
			}
			current = current.next;
		}

		return undefined;
	}
	delete(key: string): void {
		const index = this.hash(key);
		let current: IBucket | undefined = this.buckets[index];
		let prev: IBucket | undefined = undefined;

		while (current) {
			if (current.key === key) {
				if (prev) {
					prev.next = current.next;
				} else {
					this.buckets[index] = current.next;
				}
				return;
			}
			prev = current;
			current = current.next;
		}
	}
	clear(): void {
		this.buckets = new Array(this.buckets.length);
	}

	getBuckets(): (IBucket | undefined)[] {
		return this.buckets;
	}


}
const map = new MyMap();

map.set('London', '+25');
map.set('ab', '+20');
map.set('ba', '-10');
console.log(map.getBuckets())
console.log(map.get('Berlin'));
console.log(map.get('London'));
map.delete('Berlin');
console.log(map.get('Berlin'));

map.clear();
console.log(map.getBuckets())