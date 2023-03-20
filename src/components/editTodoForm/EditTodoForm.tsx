import React from "react";

import { TodoItem } from "../../types";

import "./editTodoForm.scss";

interface EditTodoFormProps {
	initialValue: TodoItem["value"];
	editTodoItem: (event: React.FormEvent<HTMLFormElement>) => void;
	inputName: string;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({ initialValue, editTodoItem, inputName }) => {
	return (
		<form className="edit-todo-form" onSubmit={editTodoItem} onBlur={editTodoItem}>
			<input
				className="edit-todo-form__input"
				type="text"
				defaultValue={initialValue}
				name={inputName}
				autoFocus
			/>
		</form>
	);
};

export default EditTodoForm;
