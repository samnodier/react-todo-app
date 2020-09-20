import React, { useState } from "react";
import { nanoid } from "nanoid";
import "bootstrap/dist/css/bootstrap.min.css";

// Import other component
import Todo from "./Todo";
import Filter from "./Filter";
import EditWindow from "./EditWindow";

const FILTER_MAP = {
	All: () => true,
	Active: (todo) => !todo.completed,
	Completed: (todo) => todo.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
	const [todos, updateTodos] = useState([]);
	const [clickedId, setClickedId] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [filter, setFilter] = useState("All");

	// const [content, setContent] = useState("");
	function toggleTodoCompleted(id) {
		const completedTodos = todos.map((todo) => {
			// If the task has the same ID as the checked task
			if (id === todo.id) {
				// Through the use of spread to a make a new object
				// That we changed its completed property
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		updateTodos(completedTodos);
	}
	const setIsEditingFromOutSide = (bool) => {
		setIsEditing(bool);
	};

	function editTodo(buttonId, todoId, todoContent) {
		switch (buttonId) {
			case "edit":
				setIsEditing(true);
				document.querySelector(".text-area").textContent = todoContent;
				document.querySelector(".app-window").className =
					"app-window deactivated";
				document.querySelector(".editor-window").style.visibility = "visible";
				setClickedId(todoId);
				break;
			case "delete":
				localStorage.removeItem(todoId);
				const remainingTodos = todos.filter((todo) => todoId !== todo.id);
				updateTodos(remainingTodos);
		}
	}

	const changeTodo = (contentFromWindow) => {
		const changedTodoList = todos.map((todo) => {
			// If this todo has the same ID as the edited todo
			if (clickedId === todo.id) {
				return { ...todo, content: contentFromWindow };
			}
			return todo;
		});
		changedTodoList.map((todo) => {
			localStorage.setItem(todo.id, JSON.stringify(todo));
		});
		updateTodos(changedTodoList);
	};
	const [searchResults, setSearchResults] = useState([]);

	const addTodo = (todoText) => {
		const newTodo = {
			id: "id-" + nanoid(),
			content: todoText,
			completed: false,
		};
		localStorage.setItem(newTodo.id, JSON.stringify(newTodo));
		updateTodos([...todos, newTodo]);
	};

	if (todos.length === 0) {
		if (Object.keys(localStorage).length !== 0) {
			let keys = Object.keys(localStorage);
			const storedTodos = keys.map((key) => {
				return JSON.parse(localStorage.getItem(key));
			});
			updateTodos(storedTodos);
		}
	}

	console.log(Object.keys(localStorage).length);
	let todoList = todos
		.filter(FILTER_MAP[filter])
		.map((todo) => (
			<Todo
				id={todo.id}
				content={todo.content}
				completed={todo.completed}
				key={todo.id}
				toggleTodoCompleted={toggleTodoCompleted}
				editTodo={editTodo}
			/>
		));

	const handleFilter = (string) => {
		// If the search text is in one of the todo items
		// Filter them and remain with the ones the qualify
		const updatedTodos = todos.filter((todo) =>
			todo.content.toLowerCase().includes(string.trim())
		);
		setSearchResults(updatedTodos);
	};

	if (searchResults.length > 0) {
		todoList = searchResults
			.filter(FILTER_MAP[filter])
			.map((searchResult) => (
				<Todo
					id={searchResult.id}
					content={searchResult.content}
					completed={searchResult.completed}
					key={searchResult.id}
					toggleTodoCompleted={toggleTodoCompleted}
					editTodo={editTodo}
				/>
			));
	}
	let dayName = "";
	// let day = ;
	switch (new Date().getDay()) {
		case 0:
			dayName = "Sunday";
			break;
		case 1:
			dayName = "Monday";
			break;
		case 2:
			dayName = "Tuesday";
			break;
		case 3:
			dayName = "Wednesday";
			break;
		case 4:
			dayName = "Thursday";
			break;
		case 5:
			dayName = "Friday";
			break;
		default:
			dayName = "Saturday";
			break;
	}

	const todosNumber = `${todos.length}`;

	return (
		<div className="todoapp">
			{/*<div className="svg"></div>*/}
			<div className="header">
				<h1>Todo App</h1>
			</div>
			<div className="app-window">
				<div className="filter">
					<Filter
						handleFilter={handleFilter}
						setIsEditingFromOutSide={setIsEditingFromOutSide}
						FILTER_NAMES={FILTER_NAMES}
						setFilter={setFilter}
					/>
				</div>
				<div>
					<div className="status">
						<h4>{dayName}</h4>
						<p className="todosNumber">{todosNumber}</p>
					</div>
					<ul className="todo-list" aria-live="assertive">
						{todoList}
					</ul>
				</div>
			</div>
			<div className="editor-window">
				<EditWindow
					addTodo={addTodo}
					changeTodo={changeTodo}
					editing={isEditing}
					setIsEditingFromOutSide={setIsEditingFromOutSide}
				/>
			</div>
		</div>
	);
}

export default App;
