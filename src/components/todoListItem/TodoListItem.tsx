import React from "react";

import { ITodoItem } from "../../types";
import { todosContext } from "../../context";
import Checkbox from "../checkbox/Checkbox";

import "./todoListItem.scss";

const TodoListItem: React.FC<ITodoItem> = ({ id, value, completed }) => {
	const { updateItem, removeItem } = React.useContext(todosContext);

	const removeTodoItem = () => {
		removeItem(id);
	};

	const toggleCheckbox = () => {
		updateItem({
			id,
			value,
			completed: !completed,
		});
	};

	return (
		<>
			<span className="item-todo" data-todo={id}>
				<span className="item-todo__checkbox">
					<Checkbox id={id} value={completed} onChange={toggleCheckbox} />
				</span>
				<span className="item-todo__value">{value}</span>
				<button className="item-todo__btn-remove" onClick={removeTodoItem}>
					<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
							fill="currentColor"
						></path>
					</svg>
				</button>
			</span>
		</>
	);
};

export default TodoListItem;
