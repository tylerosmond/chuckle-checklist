import { useState } from "react";
import "./App.css";
import { handleSubmit } from "./services/jokeService";
import stevePic from "./assets/steve.png";

export const App = () => {
  const [newOneLiner, setNewOneLiner] = useState("");

  const handleInputChange = (event) => {
    setNewOneLiner(event.target.value);
  };

  const onSubmit = () => {
    handleSubmit(newOneLiner, setNewOneLiner);
  };

  return (
    <div className="app-container">
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={newOneLiner}
          onChange={handleInputChange}
        />
        <button className="joke-input-submit" onClick={onSubmit}>
          Add
        </button>
      </div>
    </div>
  );
};
