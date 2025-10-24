import { HashSet } from "./HashSet.js";

const test = new HashSet();

test.set("apple");
test.set("banana");
test.set("carrot");
test.set("dog");
test.set("elephant");
test.set("frog");
test.set("grape");
test.set("hat");
test.set("ice cream");
test.set("jacket");
test.set("kite");
test.set("lion");

console.log("The following are the intial hash set keys:");
console.log(test.keys());

// at this point, the hash set should be a full capacity (0.75)

// try repeating nodes (set should avoid creating duplicates)
test.set("carrot");
test.set("ice cream");
test.set("dog");
test.set("lion");

console.log("\nThe following are the hash set keys:");
console.log(test.keys());

// exceed load factor, resulting in capacity being doubled
console.log(
  `\nThe current hash set size is ${test.size} and the capacity is ${test.capacity}.`,
);
test.set("moon");
console.log("New key was added: 'moon'");
console.log(
  `The current hash set size is ${test.size} and the capacity is ${test.capacity}.`,
);

// try repeating nodes again( set should avoid creating duplicates)
test.set("carrot");
test.set("ice cream");
test.set("dog");
test.set("lion");

console.log("\nThe following are the hash set keys:");
console.log(test.keys());

// testing get method
const getTestKeys = ["dog", "moon", "human"];
console.log("\nTesting 'get' methods:");
for (const key of getTestKeys) {
  const value = test.get(key);
  if (value === null) {
    console.log(`The key ${key} does not exist in the hash set.`);
  } else {
    console.log(`The key ${key} has a value of '${value}'.`);
  }
}

// testing has method
const hasTestKeys = ["moon", "ice cream", "human"];
console.log("\nTesting 'has' methods:");
for (const key of hasTestKeys) {
  const value = test.has(key);
  if (value === false) {
    console.log(`The key '${key}' does not exist in the hash set.`);
  } else {
    console.log(`The key '${key}' exists in the hash set.`);
  }
}

const removeKeys = ["moon", "ice cream", "dog", "human"];
console.log("\nTesting 'remove' methods:");
for (const key of removeKeys) {
  test.remove(key);
  console.log(`The key '${key}' was removed.`);
}
console.log("\nThe following are the updated hash set keys:");
console.log(test.keys());
console.log(
  `The current hash set size is ${test.size} and the capacity is ${test.capacity}.`,
);

// try clearing nodes
test.clear();
console.log("\nThe hash set was cleared!");
console.log("The following are the hash set keys:");
console.log(test.keys());
console.log(
  `The current hash set size is ${test.size} and the capacity is ${test.capacity}.`,
);
