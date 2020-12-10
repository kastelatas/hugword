import React from "react";

const AchievementsItem = () => {
    let bool = true ;
    if(bool) {
        return (
            <div className="achievements-block">
                <div className="radialProgressBar progress-10">
                    <div className="overlay"></div>
                </div>
                <span className="achievement-block__achiv-text">Celebrity</span>
                <div className="achievements-block__hover">
                    <div className="achievement-block__achiv-text-hover">
                        You have uploaded a cover photo!
                        This is so cool!
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="achievements-block">
                <div className="achievements-block__hover">
                    <div className="achievement-block__achiv-text-hover">
                        Closed achievement
                    </div>
                </div>
            </div>
        )
    }
};

export default AchievementsItem;