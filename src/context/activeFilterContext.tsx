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
	const searchParams = new URLSearchParams(window.location.search);
	const initialFilter = (searchParams.get("filter") as FILTERS) || FILTERS.ALL;

	const [activeFilter, setActiveFilter] = React.useState<FILTERS>(initialFilter);

	const changeFilter = (filter: FILTERS) => {
		const url = filter !== FILTERS.ALL ? `${window.location.pathname}?filter=${filter}` : window.location.pathname;

		window.history.pushState(null, "", url);

		setActiveFilter(filter);
	};

	return (
		<activeFilterContext.Provider value={{ activeFilter, changeFilter }}>{children}</activeFilterContext.Provider>
	);
};

export default Context;
