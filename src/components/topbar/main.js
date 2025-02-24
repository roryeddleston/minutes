import React from 'react';
import './style.scss';

export default function Topbar(props) {

    return (
        <div className="topbar">
            <div className="inner">
                <h1>
                    Reps <span className="ampersand">&</span> mins
                </h1>
            </div>
        </div>
    )
}
