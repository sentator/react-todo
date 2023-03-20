import React from "react";

import "./emptyListMessage.scss";

interface EmptyListMessageProps {
	message: string;
}

const EmptyListMessage: React.FC<EmptyListMessageProps> = ({ message }) => {
	return <p className="empty-list-message">{message}</p>;
};

export default EmptyListMessage;
