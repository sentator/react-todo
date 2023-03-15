import React from "react";

import { ITodoItem } from "../../types";
import { todosContext } from "../../context";
import CompletionToggler from "../completionToggler/CompletionToggler";

import "./header.scss";

const Header: React.FC = () => {
	const { todos, addItem, updateMany, totalItems, completedItems } = React.useContext(todosContext);
	const inputRef = React.useRef<HTMLInputElement>(null);
	const isTogglerChecked = !!totalItems && totalItems === completedItems;

	const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const value = inputRef.current?.value;

		if (value) {
			const todoItem: ITodoItem = {
				id: Date.now().toString(),
				value,
				completed: false,
			};

			addItem(todoItem);
		}

		event.currentTarget.reset();
	};

	const toggleAllTodosStatus = () => {
		const updatedTodos = todos.map((item) => ({ ...item, completed: !isTogglerChecked }));

		updateMany(updatedTodos);
	};

	return (
		<div className="header">
			<div className="header__toggler">
				<CompletionToggler value={isTogglerChecked} onChange={toggleAllTodosStatus} />
			</div>
			<form className="header__form" onSubmit={addNewTodo}>
				<input className="header__textfield" type="text" placeholder="What needs to be done?" ref={inputRef} />
			</form>
		</div>
	);
};

export default Header;
