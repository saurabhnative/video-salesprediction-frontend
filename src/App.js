import React, {useState} from 'react';
import './App.css';
import ConsoleSelection from './components/ConsoleSelection';
import TypingTextComponent from './components/TypingTextComponent';
import axios from 'axios';

function App() {
  const [selectedObject, updateSelectedObject] = useState({})
  const [modelPrediction, setModelPrediction] = useState(null)
  const setOptionInObject = (itemKey, consoleOption) => {
    const tempSelectedObject = selectedObject;
    tempSelectedObject[itemKey] = consoleOption;
    updateSelectedObject(tempSelectedObject);
  }
  const handleInputSubmission = () => {
    axios.post('https://video-game-sales-backend.herokuapp.com/get_prediction', selectedObject)
    .then(function (response) {
      setModelPrediction(response.data.result)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const dropDownKeys = ["CONSOLE","YEAR","CATEGORY","PUBLISHER","RATING","CRITICS_POINTS","USER_POINTS"];
  return (
    <div className="App">
      <nav className="navbar navbar-dark justify-content-center">
        <center><h3>👾 Video games sales prediction</h3></center>
      </nav>
      <TypingTextComponent />
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <div className="container-grid">
        {
          dropDownKeys.map((item,index)=>{
            return <ConsoleSelection itemKey={item} setOptionInObject={setOptionInObject} key={index}/> 
          })
        }
        </div>
        <div className="submit-button-container">
          <button className="btn btn-grad" onClick={() => handleInputSubmission()}>
            Submit
          </button>
        </div>
        <div className="mt-4">
          {modelPrediction ? 
          <span>Predicted Sales in Millions: {modelPrediction.toFixed(2)}</span> 
          : 
          null }
        </div>
      </div>
    </div>
  );
}

export default App;
