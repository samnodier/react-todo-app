import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ControlButton.css";

export default function ControlButton(props) {
	return (
		<button
			className={props.class}
			id={props.id}
			onClick={() => props.editTodo(props.id)}
		>
			<FontAwesomeIcon icon={props.icon} />
		</button>
	);
}
