import { BinarySearchTree } from "./BinarySearchTree.js";

const testArray = [];

// add random numbers less than 100 to test array
for (let i = 0; i < 15; i++) {
  const randomInt = Math.floor(Math.random() * 100);
  testArray.push(randomInt);
}

const tree = new BinarySearchTree(testArray);

// confirm the tree is balanced
if (tree.isBalanced()) {
  tree.print();
  console.log("The tree is balanced.");
}

// print out all elements in level, pre, post, and in-order
console.log("\nElements of the tree printed out in level order:");
tree.levelOrderForEach((node) => {
  console.log(node.value);
});
console.log("\nElements of the tree printed out in preorder order:");
tree.preOrderForEach((node) => {
  console.log(node.value);
});
console.log("\nElements of the tree printed out in postorder order:");
tree.postOrderForEach((node) => {
  console.log(node.value);
});
console.log("\nElements of the tree printed out in inorder order:");
tree.inOrderForEach((node) => {
  console.log(node.value);
});

// add numbers greater than 100 to unbalance tree
for (let i = 0; i < 5; i++) {
  const randomInt = Math.floor(Math.random() * 101) + 100;
  tree.insert(randomInt);
}

// testing deletion
tree.insert(205);
tree.insert(200);
tree.insert(400);
tree.insert(300);
tree.insert(375);
tree.deleteItem(205);
tree.deleteItem(200);
tree.deleteItem(400);
tree.deleteItem(300);
tree.deleteItem(375);
tree.deleteItem(500); // this should have no effect

// rebalance the tree
tree.rebalance();

// confirm the tree is balanced again
if (tree.isBalanced()) {
  console.log();
  tree.print();
  console.log("The tree is balanced.");
}

// print out all elements level, pre, post, and in-order again
console.log("\nElements of the tree printed out in level order:");
tree.levelOrderForEach((node) => {
  console.log(node.value);
});
console.log("\nElements of the tree printed out in preorder order:");
tree.preOrderForEach((node) => {
  console.log(node.value);
});
console.log("\nElements of the tree printed out in postorder order:");
tree.postOrderForEach((node) => {
  console.log(node.value);
});
console.log("\nElements of the tree printed out in inorder order:");
tree.inOrderForEach((node) => {
  console.log(node.value);
});

// testing find, height, and depth
const testNum = 42;
tree.insert(testNum);
tree.rebalance();
if (tree.isBalanced()) {
  console.log();
  tree.print();
  console.log("The tree is balanced.");
}
if (tree.find(testNum) !== null) {
  console.log(
    `The tree has a node with a value of ${testNum} with a height of ${tree.height(testNum)} and a depth of ${tree.depth(testNum)}.`,
  );
}
if (tree.find(500) !== null) {
  console.log("The tree has incorrectly found a node with a value of 500...");
}
