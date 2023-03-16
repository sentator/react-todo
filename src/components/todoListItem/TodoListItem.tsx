import React from "react";
import classnames from "clsx";

import { ITodoItem } from "../../types";
import { todosContext } from "../../context";
import { useConfirmationDialog } from "../../hooks";
import Checkbox from "../checkbox/Checkbox";

import "./todoListItem.scss";

const TodoListItem: React.FC<ITodoItem> = ({ id, value, completed }) => {
	const { updateItem, removeItem } = React.useContext(todosContext);
	const { confirmDialog } = useConfirmationDialog({
		message: `Do you want to delete "${value}" from the list?`,
		onConfirmationSuccess: () => removeItem(id),
	});
	const [isEditing, setEditing] = React.useState<boolean>(false);
	const inputEditRef = React.useRef<HTMLInputElement>(null);
	const itemClassnames = classnames("item-todo", { editing: isEditing, completed });

	React.useEffect(() => {
		inputEditRef.current?.focus();
	}, [isEditing]);

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
		const currentValue = inputEditRef.current?.value;

		if (currentValue) {
			updateItem({ id, value: currentValue, completed });
		} else {
			removeTodoItem();
			inputEditRef.current && (inputEditRef.current.value = value);
		}
		setEditing(false);
	};

	return (
		<>
			<span className={itemClassnames} data-todo={id} onDoubleClick={showEditForm}>
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
				<form className="item-todo__form-edit" onSubmit={editTodoItem} onBlur={editTodoItem}>
					<input className="item-todo__input-edit" type="text" ref={inputEditRef} defaultValue={value} />
				</form>
			</span>
		</>
	);
};

export default TodoListItem;
