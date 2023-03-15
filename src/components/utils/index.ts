import { FILTERS, ITodoItem } from "../../types";

export const saveTodosToLocalStorage = (items: ITodoItem[]) => {
	const json = JSON.stringify(items);
	localStorage.setItem("TODOS", json);
};

export const getTodosFromLocalStorage: () => ITodoItem[] = () => {
	const todos = localStorage.getItem("TODOS");

	return todos ? JSON.parse(todos) : [];
};

export const filterTodos = (items: ITodoItem[], filter: FILTERS) => {
	switch (filter) {
		case FILTERS.ACTIVE:
			return items.filter((todo) => !todo.completed);
		case FILTERS.COMPLETED:
			return items.filter((todo) => todo.completed);
		case FILTERS.ALL:
		default:
			return [...items];
	}
};
