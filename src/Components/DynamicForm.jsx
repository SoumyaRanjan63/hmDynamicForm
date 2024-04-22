import { useState } from "react";

const DynamicForm = () => {
  const [inputs, setInputs] = useState([]);
  const [label, setLabel] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [optionInput, setOptionInput] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const handleTagSelection = (e) => {
    setSelectedTag(e.target.value);
    setDropdownOptions([]);
  };
  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };
  const handleOptionInputChange = (e) => {
    setOptionInput(e.target.value);
  };
  const addOption = () => {
    if (optionInput.trim() !== "") {
      setDropdownOptions([...dropdownOptions, optionInput]);
      setOptionInput("");
    }
  };
  const addInput = () => {
    if(dropdownOptions.length <=1 && selectedTag === "dropdown"){
        alert("Please fill multiple options !");
        return;
        
    }
    if (!selectedTag || selectedTag === "select") {
      alert("Please select a tag");
      return;
    }
    if (inputs === "" || label === "") {
      alert("Please fill all the fields");
      return;
    }

    setInputs([
      ...inputs,
      { type: selectedTag, label, options: dropdownOptions },
    ]);
    setLabel("");
    setDropdownOptions([])
    setSelectedTag("select");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <>
      <h1>Create Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tagSelection">Select your tags</label>
          <select
            name="tagSelection"
            id="tagSelection"
            value={selectedTag}
            onChange={handleTagSelection}
          >
            <option value="">Select</option>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="textarea">Textarea</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="dropdown">Dropdown</option>
          </select>
        </div>
        <div>
          <label htmlFor="labelInput">Input label:</label>
          <input type="text" value={label} onChange={handleLabelChange} />
        </div>
        <button type="button" onClick={addInput}>
          Add Input
        </button>
        {selectedTag === "dropdown" && (
          <div>
            <label htmlFor="optionInput">Add option:</label>
            <input
              type="text"
              id="optionInput"
              value={optionInput}
              onChange={handleOptionInputChange}
            />
            <button type="button" onClick={addOption}>Add Option</button>
               <ul>
                    {
                        dropdownOptions.map((option,index)=>(
                                <li key={index}>{option}</li>
                            ))
                    }
               </ul>
          </div>
        )}
      </form>
      <hr />
      <form onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <div key={index}>
            <label htmlFor={input.type}>{input.label}</label>
            {input.type === "text" && <input type="text" />}
            {input.type === "number" && <input type="number" />}
            {input.type === "textarea" && <textarea />}
            {input.type === "checkbox" && <input type="checkbox" />}
            {input.type === "radio" && <input type="radio" />}
            {input.type === "dropdown" && (
              <select>
                {input.options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default DynamicForm;
