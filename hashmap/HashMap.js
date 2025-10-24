import { LinkedList } from "../linked lists/LinkedList.js";

// HashMap implementation
class HashMap {
  static #DEFAULT_LOAD_FACTOR = 0.75;
  static #DEFAULT_CAPACITY = 16;

  #loadFactor;
  #capacity;
  #size = 0; // how many keys are stored in the hashmap
  #values; // array containing values of the keys

  constructor(
    loadFactor = HashMap.#DEFAULT_LOAD_FACTOR,
    capacity = HashMap.#DEFAULT_CAPACITY,
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

  // takes two arguments: the first is a key, and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten
  set(key, value) {
    // produce hashcode
    const hashCode = this.hash(key);
    const bucket = this.#values[hashCode];

    // check if key exists, override the value
    const bucketIndex = this.find(key);
    if (bucketIndex !== null) {
      const currentNode = bucket.at(bucketIndex);
      currentNode.value = { key, value };
    } else {
      // else, add key to bucket
      bucket.append({ key, value });
      this.#size++;
      // check if capacity has been surpassed, if so, grow the hashmap
      if (this.exceedsCapacity()) {
        this.doubleCapacity();
      }
    }
  }

  // takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
  get(key) {
    const index = this.hash(key);
    const bucket = this.#values[index];
    const bucketIndex = this.find(key);

    if (bucketIndex !== null) {
      return bucket.at(bucketIndex).value.value;
    } else {
      return null;
    }
  }

  // takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
  has(key) {
    const keys = this.keys();
    return keys.includes(key);
  }

  // takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
  remove(key) {
    const index = this.hash(key);
    const bucket = this.#values[index];
    const bucketIndex = this.find(key);

    if (bucketIndex !== null) {
      bucket.removeAt(bucketIndex);
      this.#size--;
      return true;
    } else {
      return false;
    }
  }

  // returns the number of stored keys in the hash map
  get size() {
    return this.#size;
  }

  // returns the capacity of the hash map
  get capacity() {
    return this.#capacity;
  }

  // removes all entries in the hash map.
  clear() {
    this.#values = Array.from(
      { length: this.#capacity },
      () => new LinkedList(),
    );
    this.#size = 0;
  }

  // returns an array containing all the keys inside the hash map.
  keys() {
    // variable initialization
    const keys = [];

    // look through buckets and save every key
    for (let i = 0; i < this.#capacity; i++) {
      const bucket = this.#values[i];
      for (let j = 0; j < bucket.size; j++) {
        const entry = bucket.at(j).value;
        keys.push(entry.key);
      }
    }

    return keys;
  }

  // returns an array containing all the values.
  values() {
    // variable initialization
    const values = [];

    // look through buckets and save every key
    for (let i = 0; i < this.#capacity; i++) {
      const bucket = this.#values[i];
      for (let j = 0; j < bucket.size; j++) {
        const entry = bucket.at(j).value;
        values.push(entry.value);
      }
    }

    return values;
  }

  // returns an array that contains each key, value pair.
  entries() {
    // variable initialization
    const entries = [];

    // look through buckets and save every key
    for (let i = 0; i < this.#capacity; i++) {
      const bucket = this.#values[i];
      for (let j = 0; j < bucket.size; j++) {
        const entry = bucket.at(j).value;
        entries.push(entry);
      }
    }

    return entries;
  }

  // returns true if size of array exceeds loadFactor * capacity
  exceedsCapacity() {
    return this.#size > this.#loadFactor * this.#capacity;
  }

  // doubles the capacity of the hash map
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
      this.set(entry.key, entry.value);
    }
  }

  // loops through hashMap to determine if a key exists. If key is found, returns index where it is found.
  find(key) {
    // loop through buckets
    for (let i = 0; i < this.#capacity; i++) {
      const bucket = this.#values[i];
      for (let index = 0; index < bucket.size; index++) {
        const entry = bucket.at(index).value;
        if (entry.key === key) {
          return index;
        }
      }
    }

    // if key wasn't found, returns null
    return null;
  }
}

export { HashMap };
