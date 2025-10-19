import { LinkedList } from "./LinkedList.js";

const testQueries = ["dog", "parakeet", "turtle", "alien"];
const list = new LinkedList();

list.append("cat");
list.prepend("dog");
list.append("parrot");
list.append("hamster");
list.pop();
list.append("snake");
list.insertAt("fish", 3);
list.append("turtle");
list.removeAt(0);
list.insertAt("bunny", 0);
list.insertAt("dog", list.size - 1);

console.log(list.toString()); // ( bunny ) -> ( cat ) -> ( parrot ) -> ( fish ) -> ( snake ) -> ( dog ) -> ( turtle )
console.log(`The size of the list is ${list.size}.`); // The size of the list is 7.
for (const query of testQueries) {
  console.log(`${query} in array? ${list.contains(query)}.`);
  const index = list.find(query);
  if (index !== null) {
    console.log(`${query} is found in index ${index}.`);
  }
}
