import React from "react";
import classnames from "clsx";

import { ITodoItem } from "../../types";
import { todosContext } from "../../context";
import { useConfirmationDialog } from "../../hooks";
import FiltersList from "../filtersList/FiltersList";

import "./footer.scss";

const Footer: React.FC = () => {
	const { activeItems, completedItems, removeMany } = React.useContext(todosContext);
	const { confirmDialog } = useConfirmationDialog({
		message: `Do you want to remove all completed items from the list?`,
		onConfirmationSuccess: removeCompletedTodos,
	});
	const btnClassnames = classnames("footer__btn-clear-completed", { visible: !!completedItems });

	function removeCompletedTodos() {
		const filterCallback = (item: ITodoItem) => !item.completed;
		removeMany(filterCallback);
	}

	function clearCompetedItems() {
		confirmDialog();
	}

	return (
		<div className="footer">
			<p className="footer__left"> {activeItems === 1 ? "1 item left" : `${activeItems} items left`}</p>
			<form className="footer__filters">
				<FiltersList />
			</form>
			<button className={btnClassnames} onClick={clearCompetedItems}>
				Clear completed
			</button>
		</div>
	);
};

export default Footer;
