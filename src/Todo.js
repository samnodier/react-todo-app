import React from "react";
import ControlButton from "./ControlButton";
import "./Todo.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { faEdit, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function Todo(props) {
  function editTodo(id) {
    props.editTodo(id, props.id, props.content);
  }
  return (
    <li className="todo" id={props.id}>
      <input
        id={props.id}
        type="checkbox"
        defaultChecked={props.completed}
        onChange={() => props.toggleTodoCompleted(props.id)}
      />
      <span id={props.id} className="checkbox-before">
        <span>{props.content[0]}</span>
      </span>
      <label className="todo-label" htmlFor={props.id}>
        <p className="todo-label-par">
          {props.content.length > 110
            ? `${props.content.substring(0, 110)}...`
            : `${props.content}`}
        </p>
      </label>
      <div className="todo-controls" id={props.id}>
        <ControlButton
          class="btn ctrl-btn"
          id="edit"
          icon={faEdit}
          editTodo={editTodo}
        />
        {/*<ControlButton class="btn ctrl-btn" id="complete" icon={faCheck} />*/}
        <ControlButton
          class="btn ctrl-btn"
          id="delete"
          icon={faMinus}
          editTodo={editTodo}
        />
      </div>
    </li>
  );
}
