import React, { useState } from "react";
import EditButton from "./EditButton";
import EditInput from "./EditInput";

import {
	faCheck,
	faBold,
	faItalic,
	faUnderline,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";

import "./EditWindow.css";

export default function EditWindow(props) {
	const editing = props.editing;
	const [editorContent, setEditorContent] = useState("");
	let buttonClass = "col-2 btn editor-control";
	const handleText = (editorText) => {
		setEditorContent(editorText);
	};
	function handleButtonClick(id, btnClass) {
		switch (id) {
			case "bold":
				if (btnClass === buttonClass) {
					document.querySelector("#bold").className += " active";
					document.querySelector(".text-area").className += " bold";
				} else {
					document.querySelector("#bold").className = buttonClass;
					document.querySelector(
						".text-area"
					).className = document
						.querySelector(".text-area")
						.className.replace(" bold", "");
				}
				break;
			case "italic":
				if (btnClass === buttonClass) {
					document.querySelector("#italic").className += " active";
					document.querySelector(".text-area").className += " italic";
				} else {
					document.querySelector("#italic").className = buttonClass;
					document.querySelector(
						".text-area"
					).className = document
						.querySelector(".text-area")
						.className.replace(" italic", "");
				}
				break;
			case "underline":
				if (btnClass === buttonClass) {
					document.querySelector("#underline").className += " active";
					document.querySelector(".text-area").className += " underline";
				} else {
					document.querySelector("#underline").className = buttonClass;
					document.querySelector(
						".text-area"
					).className = document
						.querySelector(".text-area")
						.className.replace(" underline", "");
				}
				break;
			case "close":
				document.querySelector("#bold").className = "col-2 btn editor-control";
				document.querySelector("#italic").className =
					"col-2 btn editor-control";
				document.querySelector("#underline").className =
					"col-2 btn editor-control";
				document.querySelector(".text-area").className = "text-area";
				document.querySelector(".app-window").className = "app-window";
				document.querySelector(".editor-window").style.visibility = "hidden";
				document.querySelector(".text-area").innerHTML = "";
				break;
			case "save":
				if (!editing && editorContent.trim() !== "") {
					props.addTodo(editorContent);
					document.querySelector("#bold").className =
						"col-2 btn editor-control";
					document.querySelector("#italic").className =
						"col-2 btn editor-control";
					document.querySelector("#underline").className =
						"col-2 btn editor-control";
					document.querySelector(".text-area").className = "text-area";
					document.querySelector(".app-window").className = "app-window";
					document.querySelector(".editor-window").style.visibility = "hidden";
					document.querySelector(".text-area").innerHTML = "";
				} else if (editing && editorContent.trim() !== "") {
					props.changeTodo(editorContent);
					document.querySelector(".text-area").className = "text-area";
					document.querySelector(".app-window").className = "app-window";
					document.querySelector(".editor-window").style.visibility = "hidden";
					document.querySelector(".text-area").innerHTML = "";
				}
				props.setIsEditingFromOutSide(false);
				break;
		}
	}

	return (
		<div className="editor">
			<div className="row editor-controls">
				<EditButton
					class={buttonClass}
					id="bold"
					icon={faBold}
					handleButtonClick={handleButtonClick}
				/>
				<EditButton
					class={buttonClass}
					id="italic"
					icon={faItalic}
					handleButtonClick={handleButtonClick}
				/>
				<EditButton
					class={buttonClass}
					id="underline"
					icon={faUnderline}
					handleButtonClick={handleButtonClick}
				/>
				<EditButton
					class="col-2 btn editor-control editor-close"
					id="close"
					icon={faTimes}
					handleButtonClick={handleButtonClick}
				/>
			</div>
			<div className="editor-textarea">
				<EditInput class="text-area" handleText={handleText} />
			</div>
			<EditButton
				class="btn editor-save"
				id="save"
				icon={faCheck}
				handleButtonClick={handleButtonClick}
			/>
		</div>
	);
}
