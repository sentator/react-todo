import React from "react";
import classnames from "clsx";

import { useConfirmDialog } from "../../hooks";

import "./footer.scss";

interface FooterProps {
	activeItems: number;
	isBtnClearVisible: boolean;
	removeCompletedTodos: () => void;
	slotFilters: React.ReactElement;
}

const Footer: React.FC<FooterProps> = ({ activeItems, isBtnClearVisible, removeCompletedTodos, slotFilters }) => {
	const { confirmDialog, Dialog } = useConfirmDialog({
		onConfirmationSubmit: removeCompletedTodos,
		message: "Do you want to remove all completed todos?",
	});
	const btnClassnames = classnames("footer__btn-clear-completed", { visible: isBtnClearVisible });

	return (
		<div className="footer">
			<p className="footer__left"> {activeItems === 1 ? "1 item left" : `${activeItems} items left`}</p>
			<div className="footer__filters">{slotFilters}</div>
			<button className={btnClassnames} onClick={confirmDialog}>
				Clear completed
			</button>
			{Dialog}
		</div>
	);
};

export default Footer;
