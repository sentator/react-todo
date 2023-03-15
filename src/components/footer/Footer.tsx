import React from "react";
import classnames from "clsx";

import { ITodoItem } from "../../types";
import { todosContext } from "../../context";
import FiltersList from "../filtersList/FiltersList";

import "./footer.scss";

const Footer: React.FC = () => {
	const { activeItems, completedItems, removeMany } = React.useContext(todosContext);
	const btnClassnames = classnames("footer__btn-clear-completed", { visible: !!completedItems });

	const removeCompletedTodos = () => {
		const filterCallback = (item: ITodoItem) => !item.completed;
		removeMany(filterCallback);
	};

	return (
		<div className="footer">
			<p className="footer__left"> {activeItems === 1 ? "1 item left" : `${activeItems} items left`}</p>
			<form className="footer__filters">
				<FiltersList />
			</form>
			<button className={btnClassnames} onClick={removeCompletedTodos}>
				Clear completed
			</button>
		</div>
	);
};

export default Footer;
