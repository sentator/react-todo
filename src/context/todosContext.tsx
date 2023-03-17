import React from "react";

import { TodoItem, FilterCallback } from "../types";
import { saveTodosToLocalStorage, getTodosFromLocalStorage } from "../utils";

interface ITodosContext {
	todos: TodoItem[];
	addItem: (value: TodoItem) => void;
	updateItem: (value: TodoItem) => void;
	removeItem: (id: TodoItem["id"]) => void;
	updateMany: (value: TodoItem[]) => void;
	removeMany: (value: FilterCallback) => void;
	totalItems: number;
	activeItems: number;
	completedItems: number;
}

export const todosContext = React.createContext<ITodosContext>({
	todos: [],
	addItem: () => {},
	updateItem: () => {},
	removeItem: () => {},
	updateMany: () => {},
	removeMany: () => {},
	totalItems: 0,
	activeItems: 0,
	completedItems: 0,
});

interface ContextProps {
	children: React.ReactNode;
}

const Context: React.FC<ContextProps> = ({ children }) => {
	const [todos, setTodos] = React.useState<TodoItem[]>(getTodosFromLocalStorage());

	React.useLayoutEffect(() => {
		saveTodosToLocalStorage(todos);
	}, [todos]);

	const { totalItems, activeItems, completedItems } = todos.reduce(
		(acc, item) => {
			item.completed ? acc.completedItems++ : acc.activeItems++;
			acc.totalItems++;
			return acc;
		},
		{
			activeItems: 0,
			completedItems: 0,
			totalItems: 0,
		}
	);

	const addItem = (todo: TodoItem) => {
		setTodos((state) => [...state, todo]);
	};
	const updateItem = (todo: TodoItem) => {
		const { id } = todo;
		const updatedTodos = todos.map((item) => (item.id === id ? todo : item));

		setTodos(updatedTodos);
	};
	const removeItem = (id: TodoItem["id"]) => {
		const updatedTodos = todos.filter((item) => item.id !== id);

		setTodos(updatedTodos);
	};
	const updateMany = (updatedItems: TodoItem[]) => {
		const updatedItemsObj = updatedItems.reduce<Record<string, TodoItem>>((acc, item) => {
			acc[item.id] = item;
			return acc;
		}, {});

		const updatedTodos = todos.map((item) => {
			const updatedItem = updatedItemsObj[item.id];

			return updatedItem ? updatedItem : item;
		});

		setTodos(updatedTodos);
	};
	const removeMany = (filterCallback: FilterCallback): void => {
		const updatedTodos = todos.filter(filterCallback);

		setTodos(updatedTodos);
	};

	return (
		<todosContext.Provider
			value={{
				todos,
				addItem,
				updateItem,
				removeItem,
				updateMany,
				removeMany,
				totalItems,
				activeItems,
				completedItems,
			}}
		>
			{children}
		</todosContext.Provider>
	);
};

export default Context;
