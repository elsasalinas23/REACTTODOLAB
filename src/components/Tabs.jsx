import React from "react";
import { NavLink } from "react-router-dom";

// Simple active/inactive styles via className function
const linkClass = ({ isActive }) =>
  "tab-link" + (isActive ? " active" : "");

export default function Tabs() {
  return (
    <div className="tabs">
      <NavLink to="/" end className={linkClass}>All</NavLink>
      <NavLink to="/active" className={linkClass}>Active</NavLink>
      <NavLink to="/completed" className={linkClass}>Completed</NavLink>
    </div>
  );
}
