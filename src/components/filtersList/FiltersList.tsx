import React from "react";

import { FILTERS } from "../../types";
import FilterItem from "../filterItem/FilterItem";

import "./filtersList.scss";

const filters = [
	{ name: "todo-filters", value: FILTERS.ALL, id: "todo-filter-all" },
	{ name: "todo-filters", value: FILTERS.ACTIVE, id: "todo-filter-active" },
	{ name: "todo-filters", value: FILTERS.COMPLETED, id: "todo-filter-completed" },
];

const FiltersList: React.FC = () => {
	return (
		<ul className="todo-filters">
			{filters.map((filter) => (
				<li className="todo-filters__item" key={filter.id}>
					<FilterItem {...filter} />
				</li>
			))}
		</ul>
	);
};

export default FiltersList;
