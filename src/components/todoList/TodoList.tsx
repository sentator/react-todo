import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { TodoItem } from "../../types";
import TodoListItem from "../todoListItem/TodoListItem";

import "./todoList.scss";

interface TodoListProps {
	value: TodoItem[];
	updateItem: (todo: TodoItem) => void;
	removeItem: (id: TodoItem["id"]) => void;
}

const TodoList: React.FC<TodoListProps> = ({ value = [], updateItem, removeItem }) => {
	return (
		<TransitionGroup className="todos__list" component="ul">
			{value.map((item) => (
				<CSSTransition key={item.id} timeout={300} appear classNames="todos-item-transition">
					<li className="todos__item">
						<TodoListItem {...item} updateItem={updateItem} removeItem={removeItem} />
					</li>
				</CSSTransition>
			))}
		</TransitionGroup>
	);
};

export default TodoList;
