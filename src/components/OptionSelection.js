/**
 * This component implements the dropdown item
 * found in final web app
 */
import React,{ useState } from 'react';
import optionSources from  '../optionsSources.json';
function OptionSelection({itemKey, setOptionInObject}) {
    const [currentSelectedOption, setSelectedOption] = useState(null);
    const handleDropDownSelection = (consoleOption) => {
        setSelectedOption(consoleOption)
        setOptionInObject(itemKey, consoleOption)
    }
    const renderOptionsDropdown = () => {
        const selectionOptions = optionSources[itemKey].options;
        return selectionOptions.map((selectionOption, index)=>{
            return (
                <div className="dropdown-item pointer" 
                     key={`${index}${selectionOption}`} 
                     onClick={() => handleDropDownSelection(selectionOption)}
                >
                    {selectionOption}
                </div>
            );
        })
    }
    const title = optionSources[itemKey].dropDownPlaceholder;
    const icon = optionSources[itemKey].icon;
    return(
        <div className="d-flex justify-content-start align-items-center mt-2 selection-item">
            <div className="option-label">
            <b><span role="img" aria-label="label-icon">{icon}</span>{` ${title}`}</b>
            </div>
            <div className="dropdown ml-4">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {currentSelectedOption ? currentSelectedOption : title}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {renderOptionsDropdown()}
            </div>
            </div>
        </div>
    )
}

export default OptionSelection;