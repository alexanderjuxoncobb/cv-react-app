import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Input({ item }) {
  return (
    <div>
      <label htmlFor={item}> {item} </label>
      <input id={item} />
    </div>
  );
}

function Edit(props) {
  return (
    <div className="edit-card">
      <h1>{props.title}</h1>
      {props.items.map((item) => (
        <Input item={item} key={item} />
      ))}
    </div>
  );
}

function Sidebar() {
  return (
    <Edit
      title="Personal Details"
      items={["Full Name", "Email", "Phone Number", "Address"]}
    />
  );
}

function MainContent() {
  return <p>maincontent</p>;
}

function App() {
  return (
    <div className="main-grid">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
