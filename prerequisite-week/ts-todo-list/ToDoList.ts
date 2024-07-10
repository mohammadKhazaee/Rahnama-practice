import { Todo, TodoFilter, TodoId, TodoStatus } from "./types";

class TodoList {
	private todos: Todo[] = [];

	listAll = (): Todo[] => {
		return this.todos;
	};

	addTodo = (title: string): Todo => {
		const newTodo: Todo = {
			id: this.todos.length + 1,
			title,
			status: "Pending",
		};

		this.todos = [...this.todos, newTodo];

		return newTodo;
	};

	filterTodo = (filters: TodoFilter): Todo[] => {
		const filterkeys = Object.keys(
			filters
		) as unknown as (keyof TodoFilter)[];

		const resultList = this.todos.filter((todo) =>
			filterkeys.every((key) => todo[key] === filters[key])
		);

		return resultList;
	};

	changeStatus = (id: TodoId, status: TodoStatus): Todo | never => {
		const targetedTodoIndex = this.todos.findIndex((t) => t.id === id);
		if (targetedTodoIndex === -1) throw Error("invalid todo id!");

		const updatedTodo = { ...this.todos[targetedTodoIndex]!, status };
		this.todos = [
			...this.todos.slice(0, targetedTodoIndex),
			updatedTodo,
			...this.todos.slice(targetedTodoIndex + 1),
		];

		return updatedTodo;
	};

	deleteTodo = (id: TodoId): Todo | never => {
		const targetedTodoIndex = this.todos.findIndex((t) => t.id === id);
		if (targetedTodoIndex === -1) throw Error("invalid todo id!");

		const deleteTodo = this.todos[targetedTodoIndex]!;

		this.todos = [
			...this.todos.slice(0, targetedTodoIndex),
			...this.todos.slice(targetedTodoIndex + 1),
		];

		return deleteTodo;
	};

	findTodo = (title: string): Todo[] => {
		return this.todos.filter((t) => t.title.includes(title.trim()));
	};
}
