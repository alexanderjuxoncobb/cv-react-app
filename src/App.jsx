import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Input from "./components/Input";

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
      {props.title === "Education" && props.index === props.keyValue && (
        <button
          onClick={() =>
            props.submitEducation({
              School: props.formData["School"],
              "Start Date": props.formData["Start Date"],
              "End Date": props.formData["End Date"],
              Degree: props.formData["Degree"],
              Description: props.formData["Description"],
            })
          }
        >
          Submit
        </button>
      )}
    </div>
  );
}

function Sidebar({
  onInputChange,
  formData,
  handleIndexChange,
  index,
  submitEducation,
}) {
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
        submitEducation={submitEducation}
      />
    </div>
  );
}

function EducationItem({ schoolData, deleteSchoolData, editSchoolData }) {
  return (
    <div className="education-flex">
      <div>
        <div className="school-name">{schoolData["School"]}</div>
        <div>
          {schoolData["Start Date"]} {schoolData["Start Date"] && "--"}{" "}
          {schoolData["End Date"]}
        </div>
      </div>
      <div>
        <div className="school-name degree-name">{schoolData["Degree"]}</div>
        <div className="description">{schoolData["Description"]}</div>
      </div>
      <button
        className="delete-button"
        onClick={() => deleteSchoolData(schoolData["School"])}
      >
        &times;
      </button>
      <button
        className="edit-button"
        onClick={() => editSchoolData(schoolData)}
      ></button>
    </div>
  );
}

function MainContent({ formData, deleteSchoolData, editSchoolData }) {
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
        <h3 className="education-title">Education</h3>
        {/* need to make this so that 1. it has good layout adn 2. so that you can add multiple educations */}

        {formData["Schools"]?.map((school) => (
          <EducationItem
            schoolData={school}
            key={school.School}
            deleteSchoolData={deleteSchoolData}
            editSchoolData={editSchoolData}
          />
        ))}
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

  const submitEducation = (schoolData) => {
    const exists = formData.Schools?.some(
      (school) => school.School === schoolData.School
    );

    const updatedSchools = exists
      ? formData.Schools.map((school) =>
          school.School === schoolData.School ? schoolData : school
        )
      : formData.Schools
      ? [...formData.Schools, schoolData]
      : [schoolData];

    const updatedData = {
      ...formData,
      Schools: updatedSchools,
      School: "",
      "Start Date": "",
      "End Date": "",
      Degree: "",
      Description: "",
    };
    setFormData(updatedData);
  };

  const deleteSchoolData = (school) => {
    const updatedData = { ...formData };
    updatedData.Schools = updatedData.Schools?.filter(
      (item) => item.School !== school
    );
    setFormData(updatedData);
  };

  const editSchoolData = (schoolData) => {
    const updatedData = {
      ...formData,
      School: schoolData.School,
      "Start Date": schoolData["Start Date"],
      "End Date": schoolData["End Date"],
      Degree: schoolData.Degree,
      Description: schoolData.Description,
    };
    setEditIndex(1);
    setFormData(updatedData);
  };

  return (
    <div className="main-grid">
      <Sidebar
        onInputChange={handleInputChange}
        formData={formData}
        handleIndexChange={handleIndexChange}
        index={editIndex}
        submitEducation={submitEducation}
      />
      <MainContent
        formData={formData}
        deleteSchoolData={deleteSchoolData}
        editSchoolData={editSchoolData}
      />
    </div>
  );
}

export default App;
