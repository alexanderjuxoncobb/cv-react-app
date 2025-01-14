export default function Input({ item, onInputChange, formData }) {
  return (
    <div>
      <label htmlFor={item}> {item} </label>
      {item === "Description" ? (
        <textarea
          id={item}
          onChange={(e) => onInputChange(item, e.target.value)}
          value={formData[item] || ""}
        ></textarea>
      ) : (
        <input
          id={item}
          onChange={(e) => onInputChange(item, e.target.value)}
          value={formData[item] || ""}
          type={item === "Start Date" || item === "End Date" ? "month" : "text"}
          readOnly={
            item === "School" &&
            formData.Schools?.some((s) => s.School === formData.School)
          }
        />
      )}
    </div>
  );
}
