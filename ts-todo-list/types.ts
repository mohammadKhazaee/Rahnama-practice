const todoStatus = ["Done", "Pending"] as const;

export type TodoStatus = (typeof todoStatus)[number];

export type Todo = {
	id: number;
	title: string;
	status: TodoStatus;
};

export type TodoId = Todo[keyof Pick<Todo, "id">];

export type TodoFilter = Partial<Omit<Todo, "title">>;
