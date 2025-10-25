class Node {
  #value;
  #leftChild = null;
  #rightChild = null;

  constructor(value) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
  }

  get leftChild() {
    return this.#leftChild;
  }

  set leftChild(node) {
    this.#leftChild = node;
  }

  get rightChild() {
    return this.#rightChild;
  }

  set rightChild(node) {
    this.#rightChild = node;
  }

  // updates this node's properties to match the passed node
  copy(node) {
    this.#leftChild = node.leftChild;
    this.#rightChild = node.rightChild;
    this.#value = node.value;
  }
}

class BinarySearchTree {
  #root;

  // assumes a valid value is passed to constructor (i.e., no error checking)
  constructor(array) {
    // sort array in increasing order
    const sortedArray = array.sort((a, b) => a - b);
    // delete duplicates
    const uniqueArray = [...new Set(sortedArray)];
    // build tree
    this.#root = BinarySearchTree.buildTree(uniqueArray);
  }

  get root() {
    return this.#root;
  }

  // insert a value into the BST
  insert(value) {
    let parentNode = this.#root;
    // compare value to current node's value
    while (true) {
      if (value < parentNode.value) {
        // if left child is empty, add as left child and terminate
        if (parentNode.leftChild === null) {
          parentNode.leftChild = new Node(value);
          return;
        }

        //otherwise, make left child parent node and repeat
        parentNode = parentNode.leftChild;
      } else if (value > parentNode.value) {
        // if right child is empty, add as left child and terminate
        if (parentNode.rightChild === null) {
          parentNode.rightChild = new Node(value);
          return;
        }

        //otherwise, make right child parent node and repeat
        parentNode = parentNode.rightChild;
      } else {
        // value === parentNode.value, meaning node already exists
        return;
      }
    }
  }

  // remove a value from the BST
  deleteItem(value) {
    let parentNode = null;
    let currentNode = this.#root;

    // search until a leaf node is reached
    while (true) {
      // if value was not found, terminate function
      if (currentNode === null) {
        return;
      }

      // if value is found, exit loop
      if (currentNode.value === value) {
        break;
      }

      // else, compare value of parent node to determine where to traverse
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.leftChild;
      } else {
        parentNode = currentNode;
        currentNode = currentNode.rightChild;
      }
    }

    // three cases: deleting leaf, deleting a node with one child, deleting a node with two children
    // check children to determine case
    if (currentNode.leftChild === null) {
      // leaf node
      if (currentNode.rightChild === null) {
        if (parentNode.leftChild === currentNode) {
          parentNode.leftChild = null;
        } else {
          parentNode.rightChild = null;
        }
      } else {
        // only one child
        currentNode.copy(currentNode.rightChild);
      }
      return;
    }

    if (currentNode.rightChild === null) {
      // leaf node
      if (currentNode.leftChild === null) {
        if (parentNode.leftChild === currentNode) {
          parentNode.leftChild = null;
        } else {
          parentNode.rightChild = null;
        }
      } else {
        // only one child
        currentNode.copy(currentNode.leftChild);
      }
      return;
    }

    // two children: need to find replacement (in order predecessor)
    let replacementNode = currentNode.rightChild;
    parentNode = currentNode;
    while (replacementNode.leftChild !== null) {
      parentNode = replacementNode;
      replacementNode = replacementNode.leftChild;
    }
    currentNode.value = replacementNode.value;
    parentNode.leftChild = null;
  }

  // returns the node at a given value (or null if not found)
  find(value) {
    let parentNode = this.#root;

    // loop until a leaf node is reached
    while (true) {
      // if value is found, return it
      if (parentNode.value === value) {
        return parentNode;
      }

      // if leaf node was reached, break loop
      if (parentNode.leftChild === null && parentNode.rightChild === null) {
        break;
      }

      // else, compare value of parent node to determine where to traverse
      if (value < parentNode.value) {
        parentNode = parentNode.leftChild;
        // if no node exists, break loop
        if (parentNode === null) {
          break;
        }
      } else {
        parentNode = parentNode.rightChild;
        // if no node exists, break loop
        if (parentNode === null) {
          break;
        }
      }
    }

    // return null if value not found
    return null;
  }

  // traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument
  levelOrderForEach(callback) {
    // verify a callback function is passed
    if (typeof callback !== "function") {
      throw new TypeError("Expected a callback function");
    }

    const queue = [];
    queue.push(this.#root);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      callback(currentNode);
      if (currentNode.leftChild !== null) {
        queue.push(currentNode.leftChild);
      }
      if (currentNode.rightChild !== null) {
        queue.push(currentNode.rightChild);
      }
    }
  }

  // traverse the tree in inorder and call the callback on each node as it traverses
  inOrderForEach(callback) {
    // verify a callback function is passed
    if (typeof callback !== "function") {
      throw new TypeError("Expected a callback function");
    }

    this.#inorder(this.#root.leftChild, callback);
    callback(this.#root);
    this.#inorder(this.#root.rightChild, callback);
  }

  // helper function for recursion of in order traversal
  #inorder(node, callback) {
    if (node === null) {
      return;
    }

    this.#inorder(node.leftChild, callback);
    callback(node);
    this.#inorder(node.rightChild, callback);
  }

  // traverse the tree in preorder and call the callback on each node as it traverses
  preOrderForEach(callback) {
    // verify a callback function is passed
    if (typeof callback !== "function") {
      throw new TypeError("Expected a callback function");
    }

    callback(this.#root);
    this.#preorder(this.#root.leftChild, callback);
    this.#preorder(this.#root.rightChild, callback);
  }

  // helper function for recursion of preorder traversal
  #preorder(node, callback) {
    if (node === null) {
      return;
    }

    callback(node);
    this.#preorder(node.leftChild, callback);
    this.#preorder(node.rightChild, callback);
  }

  // traverse the tree in postorder and call the callback on each node as it traverses
  postOrderForEach(callback) {
    // verify a callback function is passed
    if (typeof callback !== "function") {
      throw new TypeError("Expected a callback function");
    }

    this.#postorder(this.#root.leftChild, callback);
    this.#postorder(this.#root.rightChild, callback);
    callback(this.#root);
  }

  // helper function for recursion of postorder traversal
  #postorder(node, callback) {
    if (node === null) {
      return;
    }

    this.#postorder(node.leftChild, callback);
    this.#postorder(node.rightChild, callback);
    callback(node);
  }

  // returns the height of the node containing the given value
  height(value) {
    const parentNode = this.find(value);

    // return null if value not found
    if (parentNode === null) {
      return null;
    }

    // otherwise, check children height recursively
    let leftHeight = -1;
    let rightHeight = -1;

    if (parentNode.leftChild !== null) {
      leftHeight = this.#heightHelper(parentNode.leftChild);
    }

    if (parentNode.rightChild !== null) {
      rightHeight = this.#heightHelper(parentNode.rightChild);
    }

    const maxHeight = Math.max(leftHeight, rightHeight) + 1;

    return maxHeight;
  }

  // helper function for recursion when determining height
  #heightHelper(node) {
    // otherwise, check children height recursively
    let leftHeight = -1;
    let rightHeight = -1;

    if (node.leftChild !== null) {
      leftHeight = this.#heightHelper(node.leftChild);
    }

    if (node.rightChild !== null) {
      rightHeight = this.#heightHelper(node.rightChild);
    }

    const maxHeight = Math.max(leftHeight, rightHeight) + 1;

    return maxHeight;
  }

  // returns the depth of the node containing the given value
  depth(value) {
    let parentNode = this.#root;
    let depth = 0;

    // loop until a leaf node is reached
    while (true) {
      // if value is found, return it
      if (parentNode.value === value) {
        return depth;
      }

      // if leaf node was reached, break loop
      if (parentNode.leftChild === null && parentNode.rightChild === null) {
        break;
      }

      // else, compare value of parent node to determine where to traverse
      depth++;
      if (value < parentNode.value) {
        parentNode = parentNode.leftChild;
        // if no node exists, break loop
        if (parentNode === null) {
          break;
        }
      } else {
        parentNode = parentNode.rightChild;
        // if no node exists, break loop
        if (parentNode === null) {
          break;
        }
      }
    }

    // return null if value not found
    return null;
  }

  // return true if the tree is balanced, false otherwise
  // a tree is balanced if, for every node in the tree, the heigh difference
  // between its left and right subtrees is no more than 1, and both the
  // left and right subtrees are also balanced
  isBalanced() {
    const parentNode = this.#root;

    // check children height recursively
    let leftHeight = 0;
    let rightHeight = 0;

    if (parentNode.leftChild !== null) {
      leftHeight = this.#heightHelper(parentNode.leftChild);
    }

    if (parentNode.rightChild !== null) {
      rightHeight = this.#heightHelper(parentNode.rightChild);
    }

    // a node is considered balanced if the height difference between its children is no more than 1
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    } else {
      // if parent is balanced, must also check if children trees are balanced
      return (
        this.#nodeIsBalanced(parentNode.leftChild) &&
        this.#nodeIsBalanced(parentNode.rightChild)
      );
    }
  }

  // helper function for checking tree baalnce: returns true if node is balanced, false otherwise
  #nodeIsBalanced(node) {
    // if null is passed, return true
    if (node === null) {
      return true;
    }

    // check children height recursively
    let leftHeight = 0;
    let rightHeight = 0;

    if (node.leftChild !== null) {
      leftHeight = this.#heightHelper(node.leftChild);
    }

    if (node.rightChild !== null) {
      rightHeight = this.#heightHelper(node.rightChild);
    }

    // a node is considered balanced if the height difference between its children is no more than 1
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    } else {
      return true;
    }
  }

  // rebalances an unbalanced tree
  rebalance() {
    const values = [];

    // traverse unbalanced tree to build new value array
    this.levelOrderForEach((node) => {
      values.push(node.value);
    });

    // build new tree that is balanced and replaced old root node
    const newTree = new BinarySearchTree(values);
    this.#root = newTree.root;
  }

  // takes an array of data and turns int into a balance binary tree full of Node objects.
  // Duplicate values are removed.
  // Returns the level 0 root node
  static buildTree(array) {
    // base case: node has no children (empty array is passed)
    if (array.length === 0) {
      return null;
    }

    // recursion
    const startIndex = 0;
    const endIndex = array.length - 1;
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const rootNode = new Node(array[midIndex]);

    rootNode.leftChild = BinarySearchTree.buildTree(array.slice(0, midIndex));
    rootNode.rightChild = BinarySearchTree.buildTree(
      array.slice(midIndex + 1, array.length),
    );

    return rootNode;
  }

  // helper function to help visualize the binary search tree
  #prettyPrint(node, prefix, isLeft) {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      this.#prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftChild !== null) {
      this.#prettyPrint(
        node.leftChild,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true,
      );
    }
  }

  print(prefix = "", isLeft = true) {
    this.#prettyPrint(this.#root, prefix, isLeft);
  }
}

export { BinarySearchTree };
