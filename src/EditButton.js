import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EditButton.css";

export default function EditButton(props) {
	function handleButtonClick(e) {
		e.preventDefault();
		props.handleButtonClick(props.id, e.target.className);
	}

	return (
		<button className={props.class} id={props.id} onClick={handleButtonClick}>
			<FontAwesomeIcon icon={props.icon} />
		</button>
	);
}
