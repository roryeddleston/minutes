import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import config from './config.json';
import LoginButton from '../../components/loginButton/main'

export default function Landing(props) {

	return (
		<div className="landing">
            <h1>{config.landing.heading}</h1>
			<LoginButton />
		</div>
	);
}
