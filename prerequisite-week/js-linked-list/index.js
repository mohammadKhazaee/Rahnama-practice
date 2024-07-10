class Node {
	constructor(value, next = null) {
		this.value = value;
		this.next = next;
	}

	insert = (val) => {
		const currentHead = new Node(this.value, this.next);
		this.value = val;
		this.next = currentHead;

		return this;
	};

	insertList = (val) => {
		const newTail = new Node(val);

		let lastNode = this;
		while (lastNode.next) lastNode = lastNode.next;

		lastNode.next = newTail;

		return this;
	};

	size = () => {
		let size = 0,
			currentNode = this;

		while (currentNode.next) {
			currentNode = currentNode.next;
			size++;
		}

		return size + 1;
	};

	at = (n) => {
		if (typeof n !== "number") return;
		if (n <= 0) return;

		let resultNode = this;

		for (let i = 1; i < n; i++) {
			resultNode = resultNode.next;
			if (!resultNode) return;
		}

		return resultNode;
	};

	join = (separator) => {
		let result = "" + this.value,
			currentNode = this;

		while (currentNode.next) {
			currentNode = currentNode.next;
			result += separator + currentNode.value;
		}

		return result;
	};

	map = (cb) => {
		// iterator variables
		let currentNode = this.next,
			resultHead = new Node(cb(this.value)),
			resultCurrentNode = resultHead;

		// temp variables
		let newNode;

		while (currentNode) {
			newNode = new Node(cb(currentNode.value));
			resultCurrentNode.next = newNode;

			resultCurrentNode = newNode;
			currentNode = currentNode.next;
		}

		return resultHead;
	};

	filter = (cb) => {
		// iterator variables
		let currentNode = this,
			resultCurrentNode,
			resultHead;

		// temp variables
		let isValid, newNode;

		while (currentNode) {
			isValid = cb(currentNode.value);

			if (isValid) {
				newNode = new Node(currentNode.value);

				if (!resultHead) {
					resultHead = newNode;
					resultCurrentNode = newNode;
				} else resultCurrentNode.next = newNode;

				resultCurrentNode = newNode;
			}

			currentNode = currentNode.next;
		}

		return resultHead;
	};

	find = (cb) => {
		// iterator variables
		let currentNode = this;

		while (currentNode) {
			if (cb(currentNode.value)) return currentNode;

			currentNode = currentNode.next;
		}
	};
}

// pre-written tests

// const list = new Node(6, new Node(7));
// list.insertList(8);
// list.insertList(3);
// list.insertList(9);
// console.log(list);
// console.log(list.next);
// console.log(list.join(', ');
// console.log(list.map((node) => node * 2));
// console.log(list.filter((node) => node % 2 !== 0));
// console.log(list.find((node) => node === 3));
