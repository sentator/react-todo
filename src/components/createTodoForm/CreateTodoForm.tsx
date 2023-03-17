import React from "react";

import "./createTodoForm.scss";

interface CreateTodoFormProps {
	inputName: string;
	addNewTodoItem: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ inputName, addNewTodoItem }) => {
	return (
		<form className="create-todo-form" onSubmit={addNewTodoItem}>
			<input
				className="create-todo-form__textfield"
				type="text"
				placeholder="What needs to be done?"
				name={inputName}
			/>
		</form>
	);
};

export default CreateTodoForm;
