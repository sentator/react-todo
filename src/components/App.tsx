import React from "react";

import { TodoItem, FILTERS, FilterItem } from "../types";
import { filterTodos } from "../utils";
import { todosContext } from "../context";
import Header from "./header/Header";
import CreateTodoForm from "./createTodoForm/CreateTodoForm";
import TodoList from "./todoList/TodoList";
import Footer from "./footer/Footer";
import FiltersList from "./filtersList/FiltersList";

function App() {
	const { todos, addItem, removeItem, removeMany, updateItem, updateMany, totalItems, activeItems, completedItems } =
		React.useContext(todosContext);
	const searchParams = new URLSearchParams(window.location.search);
	const initialFilter = (searchParams.get("filter") as FILTERS) || FILTERS.ALL;
	const [activeFilter, setActiveFilter] = React.useState<FILTERS>(initialFilter);

	const INPUT_FILTER_ITEM_NAME = "todo-filters";
	const INPUT_CREATE_TODO_NAME = "todoItemValue";
	const FILTERS_LIST: FilterItem[] = [
		{ name: INPUT_FILTER_ITEM_NAME, value: FILTERS.ALL, id: "todo-filter-all" },
		{ name: INPUT_FILTER_ITEM_NAME, value: FILTERS.ACTIVE, id: "todo-filter-active" },
		{ name: INPUT_FILTER_ITEM_NAME, value: FILTERS.COMPLETED, id: "todo-filter-completed" },
	];

	const filteredTodos = filterTodos(todos, activeFilter);
	const isCompletionTogglerChecked = !!totalItems && totalItems === completedItems;

	const addNewTodoItem = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const value = (formData.get(INPUT_CREATE_TODO_NAME) as string) || null;

		if (value) {
			const todoItem: TodoItem = {
				id: Date.now().toString(),
				value,
				completed: false,
			};

			addItem(todoItem);
		}

		event.currentTarget.reset();
	};
	const toggleAllTodosStatus = () => {
		const updatedTodos = todos.map((item) => ({ ...item, completed: !isCompletionTogglerChecked }));

		updateMany(updatedTodos);
	};
	const removeCompletedTodos = () => {
		const filterCallback = (item: TodoItem) => !item.completed;
		removeMany(filterCallback);
	};
	const changeActiveFilter = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const filter = formData.get(INPUT_FILTER_ITEM_NAME) as FILTERS;
		const url = filter !== FILTERS.ALL ? `${window.location.pathname}?filter=${filter}` : window.location.pathname;

		window.history.pushState(null, "", url);

		setActiveFilter(filter);
	};

	return (
		<>
			<h1 className="title">todos</h1>
			<div className="app" data-empty={!totalItems}>
				<header className="app__header">
					<Header
						toggleAllTodosStatus={toggleAllTodosStatus}
						isCompletionTogglerChecked={isCompletionTogglerChecked}
						slotForm={<CreateTodoForm inputName={INPUT_CREATE_TODO_NAME} addNewTodoItem={addNewTodoItem} />}
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
						slotFilters={
							<FiltersList
								selectedFilter={activeFilter}
								filters={FILTERS_LIST}
								changeSelectedFilter={changeActiveFilter}
							/>
						}
					/>
				</footer>
			</div>
		</>
	);
}

export default App;
