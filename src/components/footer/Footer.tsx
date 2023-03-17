import React from "react";
import classnames from "clsx";

import { useConfirmationDialog } from "../../hooks";

import "./footer.scss";

interface FooterProps {
	activeItems: number;
	isBtnClearVisible: boolean;
	removeCompletedTodos: () => void;
	slotFilters: React.ReactElement;
}

const Footer: React.FC<FooterProps> = ({ activeItems, isBtnClearVisible, removeCompletedTodos, slotFilters }) => {
	const { confirmDialog: clearCompetedItems } = useConfirmationDialog({
		message: `Do you want to remove all completed items from the list?`,
		onConfirmationSuccess: removeCompletedTodos,
	});
	const btnClassnames = classnames("footer__btn-clear-completed", { visible: isBtnClearVisible });

	return (
		<div className="footer">
			<p className="footer__left"> {activeItems === 1 ? "1 item left" : `${activeItems} items left`}</p>
			<div className="footer__filters">{slotFilters}</div>
			<button className={btnClassnames} onClick={clearCompetedItems}>
				Clear completed
			</button>
		</div>
	);
};

export default Footer;
