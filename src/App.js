import React, {useState} from 'react';
import './App.css';
import OptionSelection from './components/OptionSelection';
import TypingTextComponent from './components/TypingTextComponent';
import axios from 'axios';

function App() {
  const [selectedObject, updateSelectedObject] = useState({});
  const [modelPrediction, setModelPrediction] = useState(null);
  const [isPredictionLoading, setPredictionLoading] = useState(false);
  const [isRequestFailed, setRequestFailed] = useState(null);
  const setOptionInObject = (itemKey, consoleOption) => {
    const tempSelectedObject = selectedObject;
    tempSelectedObject[itemKey] = consoleOption;
    updateSelectedObject(tempSelectedObject);
  }
  const handleInputSubmission = () => {
    if(selectedObject && Object.keys(selectedObject).length === 7) {
      setPredictionLoading(true)
      setModelPrediction(null)
      setRequestFailed(null)
      axios.post(process.env.REACT_APP_HEROKU_SERVER_URL, selectedObject)
      .then(function (response) {
        setPredictionLoading(false)
        setModelPrediction(response.data.result)
      })
      .catch(function (error) {
        setPredictionLoading(false)
        setRequestFailed("Some error ocurred while fetching prediction")
      });
    } else {
      setRequestFailed("Please select all fields before submitting request")
    }
  }
  const dropDownKeys = ["CONSOLE","YEAR","CATEGORY","PUBLISHER","RATING","CRITICS_POINTS","USER_POINTS"];
  return (
    <div className="App">
      <nav className="navbar navbar-dark justify-content-center">
        <center><h3 className="title"><span role="img" aria-label="game">👾</span> Video games sales prediction</h3></center>
      </nav>
      <TypingTextComponent />
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <div className="container-grid">
        {
          dropDownKeys.map((item,index)=>{
            return <OptionSelection itemKey={item} setOptionInObject={setOptionInObject} key={index}/> 
          })
        }
        </div>
        <div className="submit-button-container">
          <button className="btn btn-grad" onClick={() => handleInputSubmission()}>
          {(() => {
            if(isPredictionLoading) {
              return(
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )
            } else {
              return(
                <span>Submit</span>
              )  
            }
          })()}
          </button>
        </div>
        <div className="mt-4">
          {modelPrediction ? 
          <span className="h2">Predicted Sales in Millions: {modelPrediction.toFixed(2)}</span> 
          : 
          null }
          {isRequestFailed ? 
          <span className="h4">{isRequestFailed}</span> 
          : 
          null }
        </div>
      </div>
    </div>
  );
}

export default App;
