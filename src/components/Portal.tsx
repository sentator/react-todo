import React from "react";
import ReactDOM from "react-dom";

interface PortalProps {
	children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
	const [container] = React.useState(() => document.createElement("div"));

	React.useEffect(() => {
		document.body.append(container);

		return () => {
			document.body.removeChild(container);
		};
	}, []);

	return ReactDOM.createPortal(children, container);
};

export default Portal;
