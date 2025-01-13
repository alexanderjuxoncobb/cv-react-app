import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Input({ item, onInputChange, formData }) {
  return (
    <div>
      <label htmlFor={item}> {item} </label>
      <input
        id={item}
        onChange={(e) => onInputChange(item, e.target.value)}
        value={formData[item] || ""}
      />
    </div>
  );
}

function Edit(props) {
  return (
    <div
      className={`edit-card ${props.index === props.keyValue ? "open" : ""}`}
    >
      <div>
        <h1>{props.title}</h1>
        <button
          onClick={() => props.handleIndexChange(props.keyValue)}
          className={props.index === props.keyValue ? "" : "rotated"}
        >
          ^
        </button>
      </div>
      <div>
        {props.items.map((item) => (
          <Input
            item={item}
            key={item}
            onInputChange={props.onInputChange}
            formData={props.formData}
          />
        ))}
      </div>
    </div>
  );
}

function Sidebar({ onInputChange, formData, handleIndexChange, index }) {
  return (
    <div className="sidebar">
      <Edit
        title="Personal Details"
        items={["Full Name", "Email", "Phone Number", "Address"]}
        onInputChange={onInputChange}
        handleIndexChange={handleIndexChange}
        index={index}
        keyValue={0}
        key={0}
        formData={formData}
      />

      <Edit
        title="Education"
        items={["School", "Start Date", "End Date", "Degree", "Description"]}
        onInputChange={onInputChange}
        handleIndexChange={handleIndexChange}
        index={index}
        keyValue={1}
        key={1}
        formData={formData}
      />
    </div>
  );
}

function MainContent({ formData }) {
  return (
    <div className="CV">
      <div className="CV-header">
        <h3>{formData["Full Name"]}</h3>
        <div className="spreader">
          <h5>{formData["Email"]}</h5>
          <h5 className="middle-item">{formData["Phone Number"]}</h5>
          <h5>{formData["Address"]}</h5>
        </div>
      </div>
      <div className="CV-Education">
        <h3>Education</h3>
        {/* need to make this so that 1. it has good layout adn 2. so that you can add multiple educations */}
      </div>
      <div>3</div>
    </div>
  );
}

function App() {
  const [formData, setFormData] = useState({});
  const [editIndex, setEditIndex] = useState(0);

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
  };

  const handleIndexChange = (key) => {
    setEditIndex(editIndex === key ? null : key);
  };

  return (
    <div className="main-grid">
      <Sidebar
        onInputChange={handleInputChange}
        formData={formData}
        handleIndexChange={handleIndexChange}
        index={editIndex}
      />
      <MainContent formData={formData} />
    </div>
  );
}

export default App;
