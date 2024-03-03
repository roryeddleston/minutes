import React, {useEffect, useState} from 'react';
import './style.scss';
import config from './config.json';
import media from '../../media';

export default function Topbar(props) {

    return (
        <div className="topbar">
            <div className="inner">
                <a className="logo" href="/"></a>
                <h1>{config.title}</h1>
            </div>
        </div>
    )
}
