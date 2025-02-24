import React from 'react';
import './style.scss';
import config from './config.json';


export default function NotFound(props) {

	return (
		<div className="notFound">
            <h1>{config.heading}</h1>
		</div>
	);
}
