import { LinkedList } from "../linked-lists/LinkedList.js";

// similar to HashMap but only contains keys
class HashSet {
  static #DEFAULT_LOAD_FACTOR = 0.75;
  static #DEFAULT_CAPACITY = 16;

  #loadFactor;
  #capacity;
  #size = 0; // how many keys are stored in the hashset
  #values; // array containing values of the keys

  constructor(
    loadFactor = HashSet.#DEFAULT_LOAD_FACTOR,
    capacity = HashSet.#DEFAULT_CAPACITY,
  ) {
    this.#loadFactor = loadFactor;
    this.#capacity = capacity;
    // initialize values array
    this.#values = Array.from(
      { length: this.#capacity },
      () => new LinkedList(),
    );
  }

  // takes a key and produces a hash code
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  // takes one argument, a key. If the key does not already exist in the hash set, it is added to the hash set.
  set(key) {
    // produce hashcode
    const hashCode = this.hash(key);
    const bucket = this.#values[hashCode];

    // only add key to the bucket if it doesn't already exist
    const bucketIndex = bucket.find(key);
    if (bucketIndex === null) {
      // else, add key to bucket
      bucket.append(key);
      this.#size++;
      // check if capacity has been surpassed, if so, grow the hashset
      if (this.exceedsCapacity()) {
        this.doubleCapacity();
      }
    }
  }

  // takes one argument as a key and returns the key if it is found in the hash set. If a key is not found, return null.
  get(key) {
    const index = this.hash(key);
    const bucket = this.#values[index];
    const bucketIndex = this.find(key);

    if (bucketIndex !== null) {
      return bucket.at(bucketIndex).value;
    } else {
      return null;
    }
  }

  // takes a key as an argument and returns true or false based on whether or not the key is in the hash set.
  has(key) {
    const keys = this.keys();
    return keys.includes(key);
  }

  // takes a key as an argument. If the given key is in the hash set, it should remove the entry with that key and return true. If the key isn’t in the hash set, it should return false.
  remove(key) {
    const index = this.hash(key);
    const bucket = this.#values[index];
    const bucketIndex = bucket.find(key);

    if (bucketIndex !== null) {
      bucket.removeAt(bucketIndex);
      this.#size--;
      return true;
    } else {
      return false;
    }
  }

  // returns the number of stored keys in the hash set
  get size() {
    return this.#size;
  }

  // returns the capacity of the hash set
  get capacity() {
    return this.#capacity;
  }

  // removes all entries in the hash set.
  clear() {
    this.#values = Array.from(
      { length: this.#capacity },
      () => new LinkedList(),
    );
    this.#size = 0;
  }

  // returns an array containing all the keys inside the hash set.
  keys() {
    // variable initialization
    const keys = [];

    // look through buckets and save every key
    for (let i = 0; i < this.#capacity; i++) {
      const bucket = this.#values[i];
      for (let j = 0; j < bucket.size; j++) {
        const entry = bucket.at(j).value;
        keys.push(entry);
      }
    }

    return keys;
  }

  // returns true if size of array exceeds loadFactor * capacity
  exceedsCapacity() {
    return this.#size > this.#loadFactor * this.#capacity;
  }

  // doubles the capacity of the hash set
  doubleCapacity() {
    // variable initialization
    const oldEntries = [];

    // look through buckets and save every entry
    for (let i = 0; i < this.#capacity; i++) {
      const bucket = this.#values[i];
      while (!bucket.isEmpty()) {
        const entry = bucket.tail.value;
        oldEntries.push(entry);
        bucket.pop();
      }
    }

    // double the capacity
    this.#capacity = 2 * this.#capacity;
    this.#values = Array.from(
      { length: this.#capacity },
      () => new LinkedList(),
    );

    // rehash old entries and add back
    this.#size = 0;
    for (let i = 0; i < oldEntries.length; i++) {
      const entry = oldEntries[i];
      this.set(entry);
    }
  }

  // loops through hashset to determine if a key exists. If key is found, returns index where it is found.
  find(key) {
    // loop through buckets
    for (let i = 0; i < this.#capacity; i++) {
      const bucket = this.#values[i];
      for (let index = 0; index < bucket.size; index++) {
        const entry = bucket.at(index).value;
        if (entry === key) {
          return index;
        }
      }
    }

    // if key wasn't found, returns null
    return null;
  }
}

export { HashSet };
