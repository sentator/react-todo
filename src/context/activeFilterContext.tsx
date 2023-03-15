import React from "react";

import { FILTERS } from "../types";

export const activeFilterContext = React.createContext({
	activeFilter: FILTERS.ALL,
	changeFilter: (filter: FILTERS) => {},
});

interface ContextProps {
	children: React.ReactNode;
}

const Context: React.FC<ContextProps> = ({ children }) => {
	const [activeFilter, setActiveFilter] = React.useState<FILTERS>(FILTERS.ALL);

	const changeFilter = (filter: FILTERS) => {
		setActiveFilter(filter);
	};

	return (
		<activeFilterContext.Provider value={{ activeFilter, changeFilter }}>{children}</activeFilterContext.Provider>
	);
};

export default Context;
