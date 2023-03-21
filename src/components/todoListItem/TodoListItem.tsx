import React from "react";
import classnames from "clsx";
import { useFocusVisible } from "react-aria";

import { TodoItem } from "../../types";
import { useConfirmDialog } from "../../hooks";
import Checkbox from "../checkbox/Checkbox";
import EditTodoForm from "../editTodoForm/EditTodoForm";

import "./todoListItem.scss";

interface TodoListItemProps extends Pick<TodoItem, "id" | "value" | "completed"> {
	updateItem: (todo: TodoItem) => void;
	removeItem: (id: TodoItem["id"]) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ id, value, completed, updateItem, removeItem }) => {
	const { confirmDialog, Dialog } = useConfirmDialog({
		onConfirmationSubmit: () => removeItem(id),
		message: `Do you want to delete "${value}" from the list?`,
	});
	const { isFocusVisible } = useFocusVisible();
	const [isEditing, setEditing] = React.useState<boolean>(false);
	const [isFocused, setFocused] = React.useState<boolean>(false);
	const actionEditRef = React.useRef<HTMLButtonElement>(null);
	const EDIT_FORM_INPUT_NAME = "edited-value";
	const itemClassnames = classnames("item-todo", {
		editing: isEditing,
		completed,
		focused: isFocused,
	});

	const removeTodoItem = () => {
		confirmDialog();
	};

	const toggleCheckbox = () => {
		updateItem({
			id,
			value,
			completed: !completed,
		});
	};

	const showEditForm = () => {
		setEditing(true);
	};

	const editTodoItem = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const currentValue = (formData.get(EDIT_FORM_INPUT_NAME) as string) || null;

		if (currentValue) {
			updateItem({ id, value: currentValue, completed });
		} else {
			removeTodoItem();
		}

		setFocused(false);
		setEditing(false);
	};

	const showTodoItemActions = () => {
		isFocusVisible && setFocused(true);
	};

	const hideTodoItemActions = () => {
		setFocused(false);
	};

	return (
		<>
			<span
				className={itemClassnames}
				onDoubleClick={showEditForm}
				onFocus={showTodoItemActions}
				onBlur={hideTodoItemActions}
			>
				<span className="item-todo__checkbox">
					<Checkbox id={id} value={completed} onChange={toggleCheckbox} />
				</span>
				<span className="item-todo__value">{value}</span>
				<div className="item-todo__actions">
					<button className="item-todo__action-edit" onClick={showEditForm} ref={actionEditRef}>
						<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					<button className="item-todo__action-remove" onClick={removeTodoItem}>
						<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
								fill="currentColor"
							></path>
						</svg>
					</button>
				</div>
				{isEditing && (
					<EditTodoForm initialValue={value} editTodoItem={editTodoItem} inputName={EDIT_FORM_INPUT_NAME} />
				)}
				<button className="item-todo__btn-remove" onClick={removeTodoItem}>
					<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
							fill="currentColor"
						></path>
					</svg>
				</button>
			</span>
			{Dialog}
		</>
	);
};

export default TodoListItem;
