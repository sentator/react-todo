import React from "react";

import { FilterItem as ItemFilter, FILTERS } from "../../types";
import FilterItem from "../filterItem/FilterItem";

import "./filtersList.scss";

interface FiltersListProps {
	selectedFilter: FILTERS;
	filters: ItemFilter[];
	changeSelectedFilter: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FiltersList: React.FC<FiltersListProps> = ({ selectedFilter, filters, changeSelectedFilter }) => {
	return (
		<form className="todo-filters" onChange={changeSelectedFilter}>
			<ul className="todo-filters__list">
				{filters.map((filter) => (
					<li className="todo-filters__item" key={filter.id}>
						<FilterItem {...filter} checkedValue={selectedFilter} />
					</li>
				))}
			</ul>
		</form>
	);
};

export default FiltersList;
