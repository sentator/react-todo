import React from "react";

import { FilterItem, FILTERS } from "../types";

export const activeFilterContext = React.createContext({
	activeFilter: FILTERS.ALL,
	filters: [] as FilterItem[],
	changeFilter: (filter: FILTERS) => {},
});

interface ContextProps {
	children: React.ReactNode;
}

const Context: React.FC<ContextProps> = ({ children }) => {
	const searchParams = new URLSearchParams(window.location.search);
	const initialFilter = (searchParams.get("filter") as FILTERS) || FILTERS.ALL;

	const [activeFilter, setActiveFilter] = React.useState<FILTERS>(initialFilter);

	const filters: FilterItem[] = [
		{ name: "todo-filters", value: FILTERS.ALL, id: "todo-filter-all" },
		{ name: "todo-filters", value: FILTERS.ACTIVE, id: "todo-filter-active" },
		{ name: "todo-filters", value: FILTERS.COMPLETED, id: "todo-filter-completed" },
	];

	const changeFilter = (filter: FILTERS) => {
		const url = filter !== FILTERS.ALL ? `${window.location.pathname}?filter=${filter}` : window.location.pathname;

		window.history.pushState(null, "", url);

		setActiveFilter(filter);
	};

	return (
		<activeFilterContext.Provider value={{ activeFilter, filters, changeFilter }}>
			{children}
		</activeFilterContext.Provider>
	);
};

export default Context;
