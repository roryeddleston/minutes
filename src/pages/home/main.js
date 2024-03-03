import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import config from './config.json';
import LogoutButton from '../../components/logoutButton/main';
import UserProfile from '../../components/userProfile/main';
import Layout from '../../components/layout/main';
import NewGoalForm from '../../components/newGoalForm/main';
import { useAuth0 } from '@auth0/auth0-react';
import Modal from '../../components/modal/main';
import { GoalsProvider } from '../../goalContext';



export default function Home(props) {

	const { isAuthenticated, isLoading } = useAuth0();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { loginWithRedirect } = useAuth0();

	if (isLoading) {
		return <div>Loading...</div>; // Or any loading indicator
	  }

	return isAuthenticated ? (
		<div className="home">
			<Layout >
				<h1>{config.intro.heading}</h1>
				<LogoutButton />
				<button onClick={() => setIsModalOpen(true)}>New Goal</button>
				<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<GoalsProvider>
					<NewGoalForm />
				</GoalsProvider>


				</Modal>
				<div id="modal-root"></div>
			</Layout>
		</div>
	) : (
		loginWithRedirect()
	  )

}
