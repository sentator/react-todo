import React from "react";
import { FocusTrap } from "@mui/base";
import { CSSTransition } from "react-transition-group";

import useMount from "./useMount";
import Portal from "../components/portal/Portal";

interface ConfirmDialogOptions {
	onConfirmationSubmit: () => void;
	onConfirmationReject?: () => void;
	title?: string;
	message?: string;
}

const useConfirmDialog = ({
	onConfirmationSubmit,
	onConfirmationReject = () => {},
	title = "Confirm the action",
	message = "Are you sure in submitting the action?",
}: ConfirmDialogOptions) => {
	const [isOpened, setOpened] = React.useState<boolean>(false);
	const ANIMATION_TIME = 300;
	const { mounted } = useMount(isOpened, ANIMATION_TIME);

	const dialogBackdropRef = React.useRef<HTMLDivElement>(null);
	const dialogBodyRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (mounted) {
			window.addEventListener("keydown", closeDialogOnEscapeKeydown);

			return () => {
				window.removeEventListener("keydown", closeDialogOnEscapeKeydown);
			};
		}
	}, [mounted]);

	const confirmDialog = () => {
		setOpened(true);
	};

	const submitAction = () => {
		onConfirmationSubmit();
		setOpened(false);
	};

	const cancelAction = () => {
		onConfirmationReject();
		setOpened(false);
	};

	const closeDialogOnEscapeKeydown = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			cancelAction();
		}
	};

	const Dialog = (
		<Portal>
			<div className="confirm-dialog" role="dialog">
				<CSSTransition
					classNames="confirm-dialog-backdrop-transition"
					in={isOpened}
					nodeRef={dialogBackdropRef}
					timeout={ANIMATION_TIME}
					mountOnEnter
					unmountOnExit
					appear
				>
					<div className="confirm-dialog__backdrop" onClick={cancelAction} ref={dialogBackdropRef}></div>
				</CSSTransition>
				<CSSTransition
					classNames="confirm-dialog-body-transition"
					in={isOpened}
					nodeRef={dialogBodyRef}
					timeout={ANIMATION_TIME}
					mountOnEnter
					unmountOnExit
					appear
				>
					<div className="confirm-dialog__body" ref={dialogBodyRef}>
						<FocusTrap open={isOpened}>
							<div className="confirm-dialog__body-container" tabIndex={-1}>
								<h2 className="confirm-dialog__title">{title}</h2>
								<p className="confirm-dialog__message">{message}</p>
								<div className="confirm-dialog__buttons">
									<button
										className="confirm-dialog__btn confirm-dialog__btn--confirm"
										onClick={submitAction}
									>
										Submit
									</button>
									<button
										className="confirm-dialog__btn confirm-dialog__btn--cancel"
										onClick={cancelAction}
									>
										Cancel
									</button>
								</div>
							</div>
						</FocusTrap>
					</div>
				</CSSTransition>
			</div>
		</Portal>
	);

	return { confirmDialog, Dialog: mounted ? Dialog : null };
};

export default useConfirmDialog;
