import React, {useEffect, useState} from 'react';
import './style.scss';

export default function Topbar(props) {

    return (
        <div className="topbar">
            <div className="inner">
                <a className="logo" href="/"></a>
                <h1>
                    Reps <span className="ampersand">&</span> mins
                </h1>
                {/* <h2>Habit tracking app</h2> */}
            </div>
        </div>
    )
}
