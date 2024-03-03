import React, {useEffect, useState} from 'react';
import './style.scss';
import config from './config.json';
import media from '../../media';

export default function Footer(props) {
    const [currYear, setCurrYear] = useState(new Date().getFullYear());

    return (
        <footer className="footer">
            <div className="inner">
                <div>
                    <p className="copyright">{"© "+currYear+" Rory Eddleston"}</p>
                </div>
            </div>
        </footer>
    )
}
