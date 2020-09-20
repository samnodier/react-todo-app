import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterButton from "./FilterButton";
import "./Filter.css";

// Import icons
import {
	faBars,
	faSearch,
	faArrowLeft,
	faList,
	faCheck,
	faCircle,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function Filter(props) {
	const [filter, setFilter] = useState("All");

	const [searchTerm, setSearchTerm] = useState("");
	const handleChange = (e) => {
		props.handleFilter(e.target.value);
		setSearchTerm(e.target.value);
	};

	function handleButtonClick(name) {
		let id = name.toLowerCase();
		switch (id) {
			case "new":
				props.setIsEditingFromOutSide(false);
				document.querySelector(".app-window").className =
					"app-window deactivated";
				document.querySelector(".editor-window").style.visibility = "visible";
				break;
			case "all":
				setFilter(name);
				props.setFilter(name);
				break;
			case "active":
				setFilter(name);
				props.setFilter(name);
				break;
			case "completed":
				setFilter(name);
				props.setFilter(name);
				break;
		}
	}
	const filterList = props.FILTER_NAMES.map((name) => {
		let icon = "";
		switch (name) {
			case "All":
				icon = faList;
				break;
			case "Active":
				icon = faCircle;
				break;
			case "Completed":
				icon = faCheck;
				break;
		}
		return (
			<FilterButton
				name={name}
				class="col-auto btn gnrl-btn"
				id={name.toLowerCase()}
				text={name}
				icon={icon}
				key={name}
				isPressed={name === filter}
				setFilter={setFilter}
				handleButtonClick={handleButtonClick}
			/>
		);
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<div className="row">
				<div className="search" id="formGridSearch">
					<label htmlFor="search">
						<input
							type="text"
							id="search"
							className="form-control"
							placeholder="Search in ToDo"
							autoComplete="off"
							role="search"
							aria-label="Search through todo items"
							tabIndex="0"
							value={searchTerm}
							onChange={handleChange}
						/>
						<FontAwesomeIcon icon={faArrowLeft} />
						<FontAwesomeIcon icon={faBars} />
						<FontAwesomeIcon icon={faSearch} />
					</label>
				</div>
			</div>
			<div className="row gnrl-btns">
				<FilterButton
					class="col-auto btn gnrl-btn"
					id="new"
					icon={faPlus}
					text="New"
					handleButtonClick={handleButtonClick}
				/>
				{filterList}
				{/*				<FilterButton
					class="col-auto btn gnrl-btn"
					id="all"
					icon={faList}
					text="All"
					handleButtonClick={handleButtonClick}
				/>
				<FilterButton
					class="col-auto btn gnrl-btn"
					id="active"
					icon={faCircle}
					text="Active"
					handleButtonClick={handleButtonClick}
				/>
				<FilterButton
					class="col-auto btn gnrl-btn"
					id="completed"
					icon={faCheck}
					text="Completed"
					handleButtonClick={handleButtonClick}
				/>*/}
			</div>
		</form>
	);
}
