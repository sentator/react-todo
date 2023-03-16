import React from "react";

import { todosContext, activeFilterContext } from "../context";
import { filterTodos } from "../utils";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import TodoList from "./todoList/TodoList";

function App() {
	const { todos, totalItems } = React.useContext(todosContext);
	const { activeFilter } = React.useContext(activeFilterContext);

	const filteredTodos = filterTodos(todos, activeFilter);

	return (
		<>
			<h1 className="title">todos</h1>
			<div className="app" data-empty={!totalItems}>
				<header className="app__header">
					<Header />
				</header>
				<main className="app__body">
					<div className="todos">
						<TodoList value={filteredTodos} />
					</div>
				</main>
				<footer className="app__footer">
					<Footer />
				</footer>
			</div>
		</>
	);
}

export default App;
