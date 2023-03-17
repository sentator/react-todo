import React from "react";

import { FilterCallback, FilterItem, FILTERS, TodoItem } from "../types";
import { filterTodos, getTodosFromLocalStorage, saveTodosToLocalStorage } from "../utils";
import Header from "./header/Header";
import TodoList from "./todoList/TodoList";
import Footer from "./footer/Footer";

function App() {
	const [todos, setTodos] = React.useState<TodoItem[]>(getTodosFromLocalStorage());
	const searchParams = new URLSearchParams(window.location.search);
	const initialFilter = (searchParams.get("filter") as FILTERS) || FILTERS.ALL;
	const [activeFilter, setActiveFilter] = React.useState<FILTERS>(initialFilter);

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
	const filters: FilterItem[] = [
		{ name: "todo-filters", value: FILTERS.ALL, id: "todo-filter-all" },
		{ name: "todo-filters", value: FILTERS.ACTIVE, id: "todo-filter-active" },
		{ name: "todo-filters", value: FILTERS.COMPLETED, id: "todo-filter-completed" },
	];
	const filteredTodos = filterTodos(todos, activeFilter);
	const isCompletionTogglerChecked = !!totalItems && totalItems === completedItems;

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
	const changeFilter = (filter: FILTERS) => {
		const url = filter !== FILTERS.ALL ? `${window.location.pathname}?filter=${filter}` : window.location.pathname;

		window.history.pushState(null, "", url);

		setActiveFilter(filter);
	};
	const toggleAllTodosStatus = () => {
		const updatedTodos = todos.map((item) => ({ ...item, completed: !isCompletionTogglerChecked }));

		updateMany(updatedTodos);
	};
	const removeCompletedTodos = () => {
		const filterCallback = (item: TodoItem) => !item.completed;
		removeMany(filterCallback);
	};

	return (
		<>
			<h1 className="title">todos</h1>
			<div className="app" data-empty={!totalItems}>
				<header className="app__header">
					<Header
						addItem={addItem}
						toggleAllTodosStatus={toggleAllTodosStatus}
						isCompletionTogglerChecked={isCompletionTogglerChecked}
					/>
				</header>
				<main className="app__body">
					<div className="todos">
						<TodoList value={filteredTodos} updateItem={updateItem} removeItem={removeItem} />
					</div>
				</main>
				<footer className="app__footer">
					<Footer
						activeItems={activeItems}
						isBtnClearVisible={!!completedItems}
						removeCompletedTodos={removeCompletedTodos}
						filters={filters}
						checkedFilter={activeFilter}
						changeFilter={changeFilter}
					/>
				</footer>
			</div>
		</>
	);
}

export default App;
