import React,{ useState } from 'react';
import optionSources from  '../optionsSources.json';
function OptionSelection({itemKey, setOptionInObject}) {
    const [currentSelectedOption, setSelectedOption] = useState(null);
    const handleDropDownSelection = (consoleOption) => {
        setSelectedOption(consoleOption)
        setOptionInObject(itemKey, consoleOption)
    }
    const renderConsoleOptions = () => {
        const consoleSelectionOptions = optionSources[itemKey].options;
        return consoleSelectionOptions.map((consoleOption, index)=>{
            return (
                <div className="dropdown-item pointer" 
                     key={`${index}${consoleOption}`} 
                     onClick={() => handleDropDownSelection(consoleOption)}
                >
                    {consoleOption}
                </div>
            );
        })
    }
    const title = optionSources[itemKey].dropDownPlaceholder;
    const icon = optionSources[itemKey].icon;
    return(
        <div className="d-flex justify-content-start align-items-center mt-2 selection-item">
            <div className="option-label">
            <b><span role="img" aria-label="label-icon">${icon}</span>{` ${title}`}</b>
            </div>
            <div className="dropdown ml-4">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {currentSelectedOption ? currentSelectedOption : title}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {renderConsoleOptions()}
            </div>
            </div>
        </div>
    )
}

export default OptionSelection;