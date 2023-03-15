import React from "react";
import { FocusTrap } from "@mui/base";
import { CSSTransition } from "react-transition-group";

import { useMount } from "../../hooks";
import Portal from "../Portal";

import "./popup.scss";

interface PopupProps {
	isOpened: boolean;
	closePopup: () => void;
	children: React.ReactElement;
}

const ANIMATION_TIME: number = 300;

const Popup: React.FC<PopupProps> = ({ isOpened, closePopup, children }) => {
	const { mounted } = useMount(isOpened, ANIMATION_TIME);
	const popupBodyRef = React.useRef<HTMLDivElement>(null);
	const popupBackdropRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (mounted) {
			document.addEventListener("keydown", closePopupOnKeydown);

			return () => {
				document.removeEventListener("keydown", closePopupOnKeydown);
			};
		}
	}, [mounted]);

	const closePopupOnKeydown = React.useCallback((e: KeyboardEvent): void => {
		if (e.code === "Escape") {
			closePopup();
		}
	}, []);

	if (!mounted) return null;

	return (
		<Portal>
			<div className="popup" role="dialog">
				<CSSTransition
					classNames="popup-backdrop-transition"
					in={isOpened}
					nodeRef={popupBackdropRef}
					timeout={ANIMATION_TIME}
					mountOnEnter
					unmountOnExit
					appear
				>
					<div className="popup__backdrop" onClick={closePopup} ref={popupBackdropRef}></div>
				</CSSTransition>
				<CSSTransition
					classNames="popup-body-transition"
					in={isOpened}
					nodeRef={popupBodyRef}
					timeout={ANIMATION_TIME}
					mountOnEnter
					unmountOnExit
					appear
				>
					<div className="popup__body" ref={popupBodyRef}>
						<FocusTrap open={isOpened}>{children}</FocusTrap>
					</div>
				</CSSTransition>
			</div>
		</Portal>
	);
};

export default Popup;
