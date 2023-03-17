import React from "react";

import { TodoItem } from "../types";
import { filterTodos } from "../utils";
import { todosContext, activeFilterContext } from "../context";
import Header from "./header/Header";
import CreateTodoForm from "./createTodoForm/CreateTodoForm";
import TodoList from "./todoList/TodoList";
import Footer from "./footer/Footer";

function App() {
	const { todos, addItem, removeItem, removeMany, updateItem, updateMany, totalItems, activeItems, completedItems } =
		React.useContext(todosContext);
	const { activeFilter, filters, changeFilter } = React.useContext(activeFilterContext);

	const filteredTodos = filterTodos(todos, activeFilter);
	const isCompletionTogglerChecked = !!totalItems && totalItems === completedItems;

	const createTodoFormInputName = "todoItemValue";

	const addNewTodoItem = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const value = (formData.get(createTodoFormInputName) as string) || null;

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

	return (
		<>
			<h1 className="title">todos</h1>
			<div className="app" data-empty={!totalItems}>
				<header className="app__header">
					<Header
						toggleAllTodosStatus={toggleAllTodosStatus}
						isCompletionTogglerChecked={isCompletionTogglerChecked}
						slotForm={
							<CreateTodoForm inputName={createTodoFormInputName} addNewTodoItem={addNewTodoItem} />
						}
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
						// slotFormFilters={}
					/>
				</footer>
			</div>
		</>
	);
}

export default App;
