import React, { useState, useEffect } from 'react';
import { useGoals } from '../../goalContext';
import { CiEdit } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import './style.scss';
import media from '../../media';
import config from './config.json';

const GoalDetail = ({ goal, onDelete, isMobileDetailView, setIsMobileDetailView }) => {
  const { editGoal, deleteGoal } = useGoals();
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState(goal);
  const [additionalAmount, setAdditionalAmount] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    setEditedGoal(goal);
    setIsEditing(false);
  }, [goal]);

  const handleBackToList = () => setIsMobileDetailView(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal(prevGoal => ({
      ...prevGoal,
      [name]: value,
    }));
  };

  const addTenToAmount = () => {
    const updatedGoal = {
      ...editedGoal,
      currentNumber: Number(editedGoal.currentNumber) + 10,
    };
    setEditedGoal(updatedGoal);
    editGoal(goal.id, updatedGoal);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    const updatedGoal = {
      ...editedGoal,
      currentNumber: Number(editedGoal.currentNumber),
      targetNumber: Number(editedGoal.targetNumber),
    };
    await editGoal(goal.id, updatedGoal);
    setIsEditing(false);
  };

  const handleAddAmountSubmit = async (e) => {
    e.preventDefault();
    const updatedCurrentNumber = Number(editedGoal.currentNumber) + Number(additionalAmount);
    const updatedGoal = { ...editedGoal, currentNumber: updatedCurrentNumber };

    setEditedGoal(updatedGoal);
    await editGoal(goal.id, updatedGoal);

    setAdditionalAmount('');
  };

  const handleDelete = async () => {
    try {
      await deleteGoal(goal.id);
      setShowDeletePopup(false);
      onDelete();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const getGoalIcon = (activity) => {
    const activityKey = activity.toLowerCase();
    if (config.activities[activityKey]) {
      return (
        <img
          src={media[config.activities[activityKey].icon]}
          alt={config.activities[activityKey].alt}
          className="goal-icon"
        />
      );
    }
    return null;
  };

  return (
    <div className="goal-detail">
      {isMobileDetailView && (
        <button className="back-button" onClick={handleBackToList}>
          <IoArrowBack /> Back to Goals
        </button>
      )}

      <div className="goal-item">
        <div className="goal-label">
          <h2 className="goal-name">{editedGoal.name}</h2>
          <div className="goal-icon">{getGoalIcon(editedGoal.name)}</div>
        </div>

        <p className="goal-amount">
          {`${editedGoal.currentNumber.toLocaleString()} / ${editedGoal.targetNumber.toLocaleString()}`}
        </p>

        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${(editedGoal.currentNumber / editedGoal.targetNumber) * 100}%` }}
          ></div>
        </div>

        {!isEditing && (
          <form onSubmit={handleAddAmountSubmit}>
            <input
              className="amount-input"
              type="number"
              value={additionalAmount}
              onChange={(e) => setAdditionalAmount(e.target.value)}
              placeholder="Add amount"
            />
            <button className="plus-10" type="button" onClick={addTenToAmount}>+10</button><br />
            <button className="submit-button" type="submit">Submit</button>
          </form>
        )}

        <div className="icon-group">
          <CiEdit className="icon" onClick={() => setIsEditing(!isEditing)} />
          <FaTrash className="icon delete-icon" onClick={() => setShowDeletePopup(true)} />
        </div>

        {isEditing && (
          <form onSubmit={saveEdit} className="edit-form">
            <div className="current-amount">
              <label htmlFor="currentNumber">Current Amount</label>
              <input
                id="currentNumber"
                type="number"
                name="currentNumber"
                value={editedGoal.currentNumber}
                onChange={handleEditChange}
                placeholder="Current Number"
              />
            </div>
            <div className="target-amount">
              <label htmlFor="targetNumber">Goal Target</label>
              <input
                id="targetNumber"
                type="number"
                name="targetNumber"
                value={editedGoal.targetNumber}
                onChange={handleEditChange}
                placeholder="Target Number"
              />
            </div>

            <div className="edit-actions">
              <button type="submit" className="btn-save">Save</button>
              <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        )}

        {showDeletePopup && (
          <>
            <div className="overlay"></div>
            <div className="delete-popup">
              <p>Are you sure you want to remove this goal?</p>
              <div className="popup-actions">
                <button onClick={handleDelete} className="btn-confirm-delete">Yes</button>
                <button onClick={() => setShowDeletePopup(false)} className="btn-cancel">Cancel</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GoalDetail;