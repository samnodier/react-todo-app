import React from "react";
import "./EditInput.css";

export default function EditInput(props) {
	function handleChange(e) {
		props.handleText(e.target.textContent);
	}
	return (
		<div
			className={props.class}
			contentEditable={true}
			onInput={handleChange}
		></div>
	);
}
