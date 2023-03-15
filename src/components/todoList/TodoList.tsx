import React from "react";

import { ITodoItem } from "../../types";
import TodoListItem from "../todoListItem/TodoListItem";

import "./todoList.scss";

interface TodoListProps {
	value: ITodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ value = [] }) => {
	return (
		<ul className="todos__list">
			{value.map((item) => (
				<li className="todos__item" key={item.id}>
					<TodoListItem {...item} />
				</li>
			))}
		</ul>
	);
};

export default TodoList;
