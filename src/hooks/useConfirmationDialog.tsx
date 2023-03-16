import { confirmAlert } from "react-confirm-alert";
import { FocusTrap } from "@mui/base";

interface useConfirmationDialogProps {
	message?: string;
	onConfirmationSuccess: () => void;
}

const useConfirmationDialog = ({ message = "Are you sure?", onConfirmationSuccess }: useConfirmationDialogProps) => {
	const confirmDialog = () => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<FocusTrap open={true}>
						<div className="confirmation-dialog__body" tabIndex={-1}>
							<h2 className="confirmation-dialog__title">Confirm the action</h2>
							<p className="confirmation-dialog__message">{message}</p>
							<div className="confirmation-dialog__buttons">
								<button
									className="confirmation-dialog__btn confirmation-dialog__btn--confirm"
									onClick={() => {
										onConfirmationSuccess();
										onClose();
									}}
								>
									Submit
								</button>
								<button
									className="confirmation-dialog__btn confirmation-dialog__btn--cancel"
									onClick={onClose}
								>
									Cancel
								</button>
							</div>
						</div>
					</FocusTrap>
				);
			},
			overlayClassName: "confirmation-dialog",
		});
	};
	return { confirmDialog };
};

export default useConfirmationDialog;
