import React, { useState, useMemo } from 'react';
import { useGoals } from '../../goalContext';
import './style.scss';

const GoalsList = ({ setSelectedGoal, selectedGoal, onExitEditMode }) => {
    const { goals } = useGoals();

    const [sortType, setSortType] = useState("newest");

    const sortedGoals = useMemo(() => {
        return [...goals].sort((a, b) => {
            if (sortType === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortType === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
            if (sortType === "completion") return (b.currentNumber / b.targetNumber) - (a.currentNumber / a.targetNumber);
            return 0;
        });
    }, [goals, sortType]);

    const handleGoalClick = (goal) => {
      if (selectedGoal && goal.id !== selectedGoal.id) {
          onExitEditMode();
      }
      setSelectedGoal(goal);
  };

    return (
      <div className="goals-list">
        <div className="sort-options">
          <label>Sort By:</label>
          <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="completion">Completion %</option>
          </select>
        </div>
        <ul>
          {sortedGoals.map((goal) => {
            const completionPercentage = Math.round((goal.currentNumber / goal.targetNumber) * 100);
            const completionAmount = `${goal.currentNumber.toLocaleString()} / ${goal.targetNumber.toLocaleString()}`;
            const itemClass = selectedGoal && goal.id === selectedGoal.id ? 'goal-item active' : 'goal-item';
            return (
              <li key={goal.id} className={itemClass} onClick={() => handleGoalClick(goal)}>
                <div className="goal-label">
                  <p className="goal-name">{goal.name}</p>
                  <p className="goal-amount">{completionAmount}</p>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${completionPercentage}%` }}></div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
};

export default GoalsList;

