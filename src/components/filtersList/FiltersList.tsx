import React from "react";

import { FilterItem as ItemFilter, FILTERS } from "../../types";
import FilterItem from "../filterItem/FilterItem";

import "./filtersList.scss";

interface FiltersListProps {
	checkedValue: FILTERS;
	values: ItemFilter[];
	changeValue: (filters: FILTERS) => void;
}

const FiltersList: React.FC<FiltersListProps> = ({ checkedValue, values, changeValue }) => {
	return (
		<form className="todo-filters">
			<ul className="todo-filters__list">
				{values.map((filter) => (
					<li className="todo-filters__item" key={filter.id}>
						<FilterItem {...filter} checkedValue={checkedValue} changeValue={changeValue} />
					</li>
				))}
			</ul>
		</form>
	);
};

export default FiltersList;
