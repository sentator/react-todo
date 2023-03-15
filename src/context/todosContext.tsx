import React from "react";

import { ITodoItem, TFilterCallback } from "../types";
import { saveTodosToLocalStorage, getTodosFromLocalStorage } from "../components/utils";

interface ITodosContext {
	todos: ITodoItem[];
	addItem: (value: ITodoItem) => void;
	updateItem: (value: ITodoItem) => void;
	removeItem: (id: ITodoItem["id"]) => void;
	updateMany: (value: ITodoItem[]) => void;
	removeMany: (value: TFilterCallback) => void;
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
	const [todos, setTodos] = React.useState<ITodoItem[]>(getTodosFromLocalStorage());

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

	const addItem = (todo: ITodoItem) => {
		setTodos((state) => [...state, todo]);
	};
	const updateItem = (todo: ITodoItem) => {
		const { id } = todo;
		const updatedTodos = todos.map((item) => (item.id === id ? todo : item));

		setTodos(updatedTodos);
	};
	const removeItem = (id: ITodoItem["id"]) => {
		const updatedTodos = todos.filter((item) => item.id !== id);

		setTodos(updatedTodos);
	};
	const updateMany = (updatedItems: ITodoItem[]) => {
		const updatedItemsObj = updatedItems.reduce<Record<string, ITodoItem>>((acc, item) => {
			acc[item.id] = item;
			return acc;
		}, {});

		const updatedTodos = todos.map((item) => {
			const updatedItem = updatedItemsObj[item.id];

			return updatedItem ? updatedItem : item;
		});

		setTodos(updatedTodos);
	};
	const removeMany = (filterCallback: TFilterCallback): void => {
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
