import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./components/App";
import { ActiveFilterContextProvider, ConfirmationDialogContextProvider, TodosContextProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<TodosContextProvider>
			<ActiveFilterContextProvider>
				<ConfirmationDialogContextProvider>
					<App />
				</ConfirmationDialogContextProvider>
			</ActiveFilterContextProvider>
		</TodosContextProvider>
	</React.StrictMode>
);
