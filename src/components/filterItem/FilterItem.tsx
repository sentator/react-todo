import React from "react";
import classnames from "clsx";

import { FILTERS } from "../../types";
import { activeFilterContext } from "../../context";

import "./filterItem.scss";

interface FilterItemProps {
	name: string;
	value: FILTERS;
	id: string;
}

const FilterItem: React.FC<FilterItemProps> = ({ name, value, id }) => {
	const { activeFilter, changeFilter } = React.useContext(activeFilterContext);
	const isChecked = value === activeFilter;
	const inputClassnames = classnames("todo-filter__input", "visually-hidden", { checked: isChecked });

	const changeActiveFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		const filter = event.target.value as FILTERS;

		changeFilter(filter);
	};

	return (
		<span className="todo-filter">
			<input
				className={inputClassnames}
				id={id}
				type="radio"
				value={value}
				name={name}
				checked={isChecked}
				onChange={changeActiveFilter}
			/>
			<label className="todo-filter__label" htmlFor={id}>
				{value}
			</label>
		</span>
	);
};

export default FilterItem;
