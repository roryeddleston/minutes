import React, { useState, useEffect } from 'react';
import './style.scss';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../../components/layout/main';
import NewGoalForm from '../../components/newGoalForm/main';
import { FaPlus } from 'react-icons/fa';
import GoalsList from '../../components/goalsList/main';
import GoalDetail from '../../components/goalDetail/main';
import { GoalsProvider } from '../../goalContext';

export default function Home() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isMobileDetailView, setIsMobileDetailView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileDetailView(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closePopup = () => setShowPopup(false);

  const handleDeleteGoal = () => {
    setSelectedGoal(null);
    setIsMobileDetailView(false);
  };

  const onExitEditMode = () => setIsEditing(false);

  const handleSelectGoal = (goal) => {
    if (selectedGoal && goal.id !== selectedGoal.id) {
      onExitEditMode();
    }
    setSelectedGoal(goal);
    if (window.innerWidth <= 768) {
      setIsMobileDetailView(true);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <div className={`home ${isMobileDetailView ? 'show-detail' : ''}`}>
      <Layout>
        <GoalsProvider>
          <button className="new-goal-btn" onClick={() => setShowPopup(true)}>
            <span className="new-goal-icon"><FaPlus /></span>
            <span className="new-goal-btn-text">New goal</span>
          </button>
          {showPopup && (
            <NewGoalForm onGoalCreated={closePopup} onClose={closePopup} setSelectedGoal={setSelectedGoal} />
          )}
          <div className="goals-container">
            {!isMobileDetailView && (
              <GoalsList setSelectedGoal={handleSelectGoal} selectedGoal={selectedGoal} onExitEditMode={onExitEditMode} />
            )}
            {selectedGoal && (
              <GoalDetail
                goal={selectedGoal}
                onDelete={handleDeleteGoal}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                isMobileDetailView={isMobileDetailView}
                setIsMobileDetailView={setIsMobileDetailView}
              />
            )}
          </div>
        </GoalsProvider>
      </Layout>
    </div>
  ) : (
    loginWithRedirect()
  );
}