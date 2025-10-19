class Node {
  #value;
  #nextNode; // nextNode === null if there is no next node

  constructor(value, nextNode = null) {
    this.value = value;
    this.#nextNode = nextNode;
  }

  get value() {
    return this.#value;
  }

  set value(val) {
    this.#value = val;
  }

  get nextNode() {
    return this.#nextNode;
  }

  set nextNode(node) {
    this.#nextNode = node;
  }
}

class LinkedList {
  #head = null; // head node of the linked list
  #tail = null; // tail node of the linked list
  #size = 0; // integer holding total number of nodes in the list

  constructor() {}

  // adds a new node containing the passed value to the end of the list
  append(value) {
    // check if linked list is empty
    if (this.#isEmpty()) {
      const node = new Node(value);
      this.#head = node;
      this.#tail = node;
      this.#size++;
      return;
    }

    // otherwise, add node to the end of the list
    const node = new Node(value);
    this.#tail.nextNode = node;
    this.#tail = node;
    this.#size++;
  }

  // adds a new node containing the passed value to the start of the list
  prepend(value) {
    // check if linked list is empty
    if (this.#isEmpty()) {
      const node = new Node(value);
      this.#head = node;
      this.#tail = node;
      this.#size++;
      return;
    }

    // otherwise, add node to the start of the list
    const node = new Node(value);
    node.nextNode = this.#head;
    this.#head = node;
    this.#size++;
  }

  // returns the total number of nodes in the list
  get size() {
    return this.#size;
  }

  // returns the first node in the list
  get head() {
    return this.#head;
  }

  // returns the last node in the list
  get tail() {
    return this.#tail;
  }

  // returns the node at the given index
  at(index) {
    let i = 0;
    let currentNode = this.#head;

    // return null if index is not within bounds of list
    if (index >= this.#size || index < 0) {
      return null;
    }

    while (i < index) {
      currentNode = currentNode.nextNode;
      i++;
    }

    return currentNode;
  }

  // removes the last element from the list
  pop() {
    // check if linked list is empty
    if (this.#isEmpty()) {
      return;
    }

    // check if only one node exits
    if (this.#size === 1) {
      this.#head = null;
      this.#tail = null;
      this.#size--;
    }

    // otherwise, set the penultimate node as the tail
    const penultimateNode = this.at(this.#size - 2);
    penultimateNode.nextNode = null;
    this.#tail = penultimateNode;
    this.#size--;
  }

  // returns true if the passed in value is in the lsit and otherwise returns false
  contains(value) {
    // iterate through list and check value
    let currentNode = this.#head;
    for (let i = 0; i < this.#size; i++) {
      if (currentNode.value === value) {
        return true;
      }

      currentNode = currentNode.nextNode;
    }

    return false;
  }

  // returns the index of the node containing value, or null if not found
  find(value) {
    // iterate through list and check value
    let currentNode = this.#head;
    for (let i = 0; i < this.#size; i++) {
      if (currentNode.value === value) {
        return i;
      }

      currentNode = currentNode.nextNode;
    }

    return null;
  }

  // return a representation of the LinkedList object as a string
  toString() {
    let str = "";

    // check if linked list is empty
    if (this.#isEmpty()) {
      str = "null";
    } else {
      let currentNode = this.#head;
      for (let i = 0; i < this.#size; i++) {
        str += `( ${currentNode.value} ) -> `;
        currentNode = currentNode.nextNode;
      }

      // add tail null pointer
      str += "null";
    }

    return str;
  }

  // insert a new node with the provided value at the given index
  insertAt(value, index) {
    // check if index is not within bounds of list
    if (index >= this.#size || index < 0) {
      return;
    }

    // check if list is empty or if we are inserting at head node
    if (this.#size === 0 || index === 0) {
      this.prepend(value);
      return;
    }

    // otherwise, find index and add the node
    let i = 0;
    let currentNode = this.#head;
    while (i < index - 1) {
      currentNode = currentNode.nextNode;
      i++;
    }
    const node = new Node(value, currentNode.nextNode);
    currentNode.nextNode = node;
    this.#size++;
  }

  // removes the node at the given index
  removeAt(index) {
    // check if index is not within bounds of list
    if (index >= this.#size || index < 0) {
      return;
    }

    // check if list is empty
    if (this.#size === 0) {
      return;
    }

    // check if only one node or last node
    if (this.#size === 1 || index === this.#size - 1) {
      this.pop();
      return;
    }

    // check if head node
    if (index === 0) {
      this.#head = this.#head.nextNode;
      this.#size--;
      return;
    }

    // otherwise, find index and remove the node
    let i = 0;
    let currentNode = this.#head;
    while (i < index - 1) {
      currentNode = currentNode.nextNode;
      i++;
    }
    currentNode.nextNode = currentNode.nextNode.nextNode;
    this.#size--;
  }

  // returns true if the linked list is empty (size === 0)
  #isEmpty() {
    if (this.#size === 0) {
      return true;
    } else {
      return false;
    }
  }
}

export { LinkedList };
