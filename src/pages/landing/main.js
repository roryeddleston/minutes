import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import config from './config.json';
import LoginButton from '../../components/loginButton/main';

export default function Landing() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home'); // Redirect to home after login
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="landing">
      <h1>{config.landing.heading}</h1>
      <LoginButton />
    </div>
  );
}
