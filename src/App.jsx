import { useEffect, useState } from "react";
import "./App.css";
import {
  getAllJokes,
  handleSubmit,
  updateJokeInDatabase,
  deleteJokeFromDatabase,
} from "./services/jokeService";
import stevePic from "./assets/steve.png";

export const App = () => {
  const [newOneLiner, setNewOneLiner] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [showUntoldJokes, setUntoldJokes] = useState([]);
  const [showToldJokes, setToldJokes] = useState([]);

  const untoldJokesCount = showUntoldJokes.length;
  const toldJokesCount = showToldJokes.length;

  useEffect(() => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
      console.log("Jokes Set!");
    });
  }, []); // get all jokes

  useEffect(() => {
    const untoldJokes = allJokes.filter((joke) => joke.told === false);
    setUntoldJokes(untoldJokes);
    console.log(untoldJokes);
    const toldJokes = allJokes.filter((joke) => joke.told === true);
    setToldJokes(toldJokes);
    console.log(toldJokes);
  }, [allJokes]); // filter told and untold

  const handleInputChange = (event) => {
    setNewOneLiner(event.target.value);
  };

  const onSubmit = () => {
    handleSubmit(newOneLiner).then(() => {
      setNewOneLiner(""); // Reset input field
      getAllJokes().then((jokesArray) => {
        setAllJokes(jokesArray);
      });
    });
  };

  const handleJokeStatusChange = (joke) => {
    const updatedJoke = { ...joke, told: !joke.told };
    updateJokeInDatabase(updatedJoke).then((updatedJokeFromDB) => {
      setAllJokes((prevJokes) =>
        prevJokes.map((j) =>
          j.id === updatedJokeFromDB.id ? updatedJokeFromDB : j
        )
      );
    });
  };

  const handleDeleteJoke = (jokeId) => {
    deleteJokeFromDatabase(jokeId).then(() => {
      setAllJokes((prevJokes) =>
        prevJokes.filter((joke) => joke.id !== jokeId)
      );
    });
  };

  return (
    <div className="app-container">
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
      <h2>Add Joke</h2>
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
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            Untold
            <span className="untold-count">{untoldJokesCount}</span>
          </h2>
          <div>
            <ul>
              {showUntoldJokes.map((joke) => (
                <li className="joke-list-item" key={joke.id}>
                  <p className="joke-list-item-text">{joke.text}</p>
                  <button onClick={() => handleDeleteJoke(joke.id)}>
                    Delete
                  </button>
                  <label>
                    Told:
                    <input
                      type="radio"
                      checked={joke.told}
                      onChange={() => handleJokeStatusChange(joke)}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="joke-list-container">
          <h2>
            Told
            <span className="told-count">{toldJokesCount}</span>
          </h2>
          <div>
            <ul>
              {showToldJokes.map((joke) => (
                <li className="joke-list-item" key={joke.id}>
                  <p className="joke-list-item-text">{joke.text}</p>
                  <button onClick={() => handleDeleteJoke(joke.id)}>
                    Delete
                  </button>
                  <label>
                    Untold:
                    <input
                      type="radio"
                      checked={!joke.told}
                      onChange={() => handleJokeStatusChange(joke)}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// import { useEffect, useState } from "react";
// import "./App.css";
// import {
//   getAllJokes,
//   handleSubmit,
//   updateJokeInDatabase,
// } from "./services/jokeService";
// import stevePic from "./assets/steve.png";

// export const App = () => {
//   const [newOneLiner, setNewOneLiner] = useState("");
//   const [allJokes, setAllJokes] = useState([]);
//   const [showUntoldJokes, setUntoldJokes] = useState([]);
//   const [showToldJokes, setToldJokes] = useState([]);

//   const untoldJokesCount = showUntoldJokes.length;
//   const toldJokesCount = showToldJokes.length;

//   useEffect(() => {
//     getAllJokes().then((jokesArray) => {
//       setAllJokes(jokesArray);
//       console.log("Jokes Set!");
//     });
//   }, []); // get all jokes

//   useEffect(() => {
//     const untoldJokes = allJokes.filter((joke) => joke.told === false);
//     setUntoldJokes(untoldJokes);
//     console.log(untoldJokes);
//     const toldJokes = allJokes.filter((joke) => joke.told === true);
//     setToldJokes(toldJokes);
//     console.log(toldJokes);
//   }, [allJokes]); // filter told and untold

//   const handleInputChange = (event) => {
//     setNewOneLiner(event.target.value);
//   };

//   const onSubmit = () => {
//     handleSubmit(newOneLiner).then(() => {
//       getAllJokes().then((jokesArray) => {
//         setAllJokes(jokesArray);
//       });
//     });
//   };

//   const handleJokeStatusChange = (joke) => {
//     const updatedJoke = { ...joke, told: !joke.told };
//     updateJokeInDatabase(updatedJoke).then((updatedJokeFromDB) => {
//       setAllJokes((prevJokes) =>
//         prevJokes.map((j) =>
//           j.id === updatedJokeFromDB.id ? updatedJokeFromDB : j
//         )
//       );
//     });
//   };

//   return (
//     <div className="app-container">
//       <div className="app-heading">
//         <div className="app-heading-circle">
//           <img className="app-logo" src={stevePic} alt="Good job Steve" />
//         </div>
//         <h1 className="app-heading-text">Chuckle Checklist</h1>
//       </div>
//       <h2>Add Joke</h2>
//       <div className="joke-add-form">
//         <input
//           className="joke-input"
//           type="text"
//           placeholder="New One Liner"
//           value={newOneLiner}
//           onChange={handleInputChange}
//         />
//         <button className="joke-input-submit" onClick={onSubmit}>
//           Add
//         </button>
//       </div>
//       <div className="joke-lists-container">
//         <div className="joke-list-container">
//           <h2>
//             Untold
//             <span className="untold-count">{untoldJokesCount}</span>
//           </h2>
//           <div>
//             <ul>
//               {showUntoldJokes.map((joke) => (
//                 <li className="joke-list-item" key={joke.id}>
//                   <p className="joke-list-item-text">{joke.text}</p>
//                   <label>
//                     Told:
//                     <input
//                       type="radio"
//                       checked={joke.told}
//                       onChange={() => handleJokeStatusChange(joke)}
//                     />
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className="joke-list-container">
//           <h2>
//             Told
//             <span className="told-count">{toldJokesCount}</span>
//           </h2>
//           <div>
//             <ul>
//               {showToldJokes.map((joke) => (
//                 <li className="joke-list-item" key={joke.id}>
//                   <p className="joke-list-item-text">{joke.text}</p>
//                   <label>
//                     Untold:
//                     <input
//                       type="radio"
//                       checked={!joke.told}
//                       onChange={() => handleJokeStatusChange(joke)}
//                     />
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
