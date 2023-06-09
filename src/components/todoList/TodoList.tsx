import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { ITodoItem } from "../../types";
import TodoListItem from "../todoListItem/TodoListItem";

import "./todoList.scss";

interface TodoListProps {
	value: ITodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ value = [] }) => {
	return (
		<TransitionGroup className="todos__list" component="ul">
			{value.map((item) => (
				<CSSTransition key={item.id} timeout={300} appear classNames="todos-item-transition">
					<li className="todos__item">
						<TodoListItem {...item} />
					</li>
				</CSSTransition>
			))}
		</TransitionGroup>
	);
};

export default TodoList;
