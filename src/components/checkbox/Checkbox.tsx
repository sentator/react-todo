import React from "react";

import "./checkbox.scss";

interface CheckboxProps {
	id: string;
	value: boolean;
	onChange: () => void;
	onFocus: () => void;
	onBlur: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, value, onChange, onFocus, onBlur }) => {
	return (
		<span className="checkbox">
			<input
				className="checkbox__input visually-hidden"
				type="checkbox"
				id={id}
				checked={value}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
			<label className="checkbox__label" htmlFor={id} onDoubleClick={(e) => e.stopPropagation()}></label>
		</span>
	);
};

export default Checkbox;
