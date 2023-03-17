import React from "react";

import { TodoItem } from "../../types";
import CompletionToggler from "../completionToggler/CompletionToggler";

import "./header.scss";

interface HeaderProps {
	addItem: (item: TodoItem) => void;
	toggleAllTodosStatus: () => void;
	isCompletionTogglerChecked: boolean;
}

const Header: React.FC<HeaderProps> = ({ addItem, toggleAllTodosStatus, isCompletionTogglerChecked }) => {
	const inputRef = React.useRef<HTMLInputElement>(null);

	const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const value = inputRef.current?.value;

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

	return (
		<div className="header">
			<div className="header__toggler">
				<CompletionToggler value={isCompletionTogglerChecked} onChange={toggleAllTodosStatus} />
			</div>
			<form className="header__form" onSubmit={addNewTodo}>
				<input className="header__textfield" type="text" placeholder="What needs to be done?" ref={inputRef} />
			</form>
		</div>
	);
};

export default Header;
