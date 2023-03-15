import React from "react";

export const confirmationDialogContext = React.createContext({
	isVisible: false,
	showDialog: () => {},
	hideDialog: () => {},
});

interface ContextProps {
	children: React.ReactNode;
}

const Context: React.FC<ContextProps> = ({ children }) => {
	const [isVisible, setVisible] = React.useState<boolean>(false);

	const showDialog = () => {
		setVisible(true);
	};
	const hideDialog = () => {
		setVisible(false);
	};

	return (
		<confirmationDialogContext.Provider value={{ isVisible, showDialog, hideDialog }}>
			{children}
		</confirmationDialogContext.Provider>
	);
};

export default Context;
