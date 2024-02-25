import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import config from './config.json';
import LogoutButton from '../../components/logoutButton/main';
import UserProfile from '../../components/userProfile/main';

export default function Home(props) {

	return (
		<div className="home">
            <h1>{config.intro.heading}</h1>
			<LogoutButton />
			<UserProfile />
		</div>
	);
}
