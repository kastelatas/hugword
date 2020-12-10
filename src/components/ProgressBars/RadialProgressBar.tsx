import React from "react";

const RadialProgressBar = () => {
    return (
        <div className="radial-progress-bar">
            <div className="radial-progress-bar__text">
                <span>72</span>
                <span>360/500</span>
            </div>
            <div className="bar-round__blue" style={{transform: 'rotate(260deg)'}}></div>
            <div className="bar-round__grey"></div>
        </div>
    )
};

export default RadialProgressBar;