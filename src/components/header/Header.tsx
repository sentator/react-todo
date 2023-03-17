import React from "react";

import CompletionToggler from "../completionToggler/CompletionToggler";

import "./header.scss";

interface HeaderProps {
	toggleAllTodosStatus: () => void;
	isCompletionTogglerChecked: boolean;
	slotForm: React.ReactElement;
}

const Header: React.FC<HeaderProps> = ({ toggleAllTodosStatus, isCompletionTogglerChecked, slotForm }) => {
	return (
		<div className="header">
			<div className="header__toggler">
				<CompletionToggler value={isCompletionTogglerChecked} onChange={toggleAllTodosStatus} />
			</div>
			<div className="header__form">{slotForm}</div>
		</div>
	);
};

export default Header;
