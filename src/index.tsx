import ReactDOM from "react-dom/client";

import { TodosContextProvider } from "./context";
import App from "./components/App";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<TodosContextProvider>
		<App />
	</TodosContextProvider>
);
