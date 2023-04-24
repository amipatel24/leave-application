import React from "react";
import "./index.css";

export default function LeftnavigationBar(props) {
  const { setLeftNavigation } = props;
  return (
    <div className="Wrapper">
      <div className="sidebar">
        <div className="closebtn" onClick={() => setLeftNavigation(false)}>
          <p> &times;</p>
        </div>
        <a href="">Home</a>
        <a href="">Profile</a>
        <a href="" className="active">
          Users List
        </a>
        <a href="">Settings</a>
      </div>
    </div>
  );
}
