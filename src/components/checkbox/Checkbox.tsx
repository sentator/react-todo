import React from "react";

import "./checkbox.scss";

interface CheckboxProps {
	id: string;
	value: boolean;
	onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, value, onChange }) => {
	return (
		<span className="checkbox">
			<input
				className="checkbox__input visually-hidden"
				type="checkbox"
				id={id}
				checked={value}
				onChange={onChange}
			/>
			<label className="checkbox__label" htmlFor={id}></label>
			<button className="item-todo__remove">
				<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
						fill="currentColor"
					></path>
				</svg>
			</button>
		</span>
	);
};

export default Checkbox;
