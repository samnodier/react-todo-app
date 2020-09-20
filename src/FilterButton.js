import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FilterButton.css";

export default function FilterButton(props) {
	return (
		<button
			className={props.class}
			id={props.id}
			onClick={() => props.handleButtonClick(props.text)}
		>
			<FontAwesomeIcon icon={props.icon} /> {props.text}
		</button>
	);
}
