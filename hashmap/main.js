import { HashMap } from "./HashMap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("The following are the intial hash map entries:");
console.log(test.entries());

// at this point, the hash map should be a full capacity (0.75)

// try overriding nodes
test.set("carrot", "OVERRIDEN");
test.set("ice cream", "OVERRIDEN");
test.set("dog", "OVERRIDEN");
test.set("lion", "OVERRIDEN");

console.log("\nThe following are the overriden hash map entries:");
console.log(test.entries());

// exceed load factor, resulting in capacity being doubled
console.log(
  `\nThe current hash map size is ${test.size} and the capacity is ${test.capacity}.`,
);
test.set("moon", "silver");
console.log("New entry was added: {'moon', 'silver'}");
console.log(
  `The current hash map size is ${test.size} and the capacity is ${test.capacity}.`,
);

// try overriding nodes again
test.set("carrot", "orange");
test.set("ice cream", "white");
test.set("dog", "brown");
test.set("lion", "golden");

console.log("\nThe following are the expanded hash map entries:");
console.log(test.entries());

// testing get method
const getTestKeys = ["dog", "moon", "human"];
console.log("\nTesting 'get' methods:");
for (const key of getTestKeys) {
  const value = test.get(key);
  if (value === null) {
    console.log(`The key ${key} does not exist in the hash map.`);
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
    console.log(`The key '${key}' does not exist in the hash map.`);
  } else {
    console.log(`The key '${key}' exists in the hash map.`);
  }
}

const removeKeys = ["moon", "ice cream", "dog", "human"];
console.log("\nTesting 'remove' methods:");
for (const key of removeKeys) {
  test.remove(key);
  console.log(`The key '${key}' was removed.`);
}
console.log("\nThe following are the updated hash map keys:");
console.log(test.keys());
console.log("The following are the updated hash map values:");
console.log(test.values());
console.log(
  `The current hash map size is ${test.size} and the capacity is ${test.capacity}.`,
);

// try clearing nodes
test.clear();
console.log("\nThe hash map was cleared!");
console.log("The following are the hash map entries:");
console.log(test.entries());
console.log(
  `The current hash map size is ${test.size} and the capacity is ${test.capacity}.`,
);
