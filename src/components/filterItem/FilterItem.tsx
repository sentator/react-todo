import React from "react";
import classnames from "clsx";

import { FILTERS } from "../../types";

import "./filterItem.scss";

interface FilterItemProps {
	name: string;
	value: FILTERS;
	id: string;
	checkedValue: FILTERS;
}

const FilterItem: React.FC<FilterItemProps> = ({ name, value, id, checkedValue }) => {
	const isChecked = value === checkedValue;
	const inputClassnames = classnames("todo-filter__input", "visually-hidden", { checked: isChecked });

	return (
		<span className="todo-filter">
			<input
				className={inputClassnames}
				id={id}
				type="radio"
				value={value}
				name={name}
				defaultChecked={isChecked}
			/>
			<label className="todo-filter__label" htmlFor={id}>
				{value}
			</label>
		</span>
	);
};

export default FilterItem;
