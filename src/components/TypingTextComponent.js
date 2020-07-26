import React from 'react';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
function TypingTextComponent() {
    return(
        <div className="d-flex justify-content-center mt-2">
            <div className="mr-1">{`Using this form predict`}</div>
            <Typist avgTypingDelay={100} stdTypingDelay={28}>
                <span>{`sales for a console`}</span>
                <Typist.Backspace count={19} delay={400} />
                <span>{`which category generates highest revenue`}</span>
                <Typist.Backspace count={40} delay={400} />
                <span>{`the impact of ratings on sales`}</span>
            </Typist>  
        </div>
    )
}

export default TypingTextComponent;