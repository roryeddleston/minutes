import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGoals } from '../../goalContext';
import './style.scss';
import { IoCloseOutline } from 'react-icons/io5';
import config from './config.json';

const NewGoalForm = ({ onGoalCreated, onClose, setSelectedGoal }) => {
  const { addGoal } = useGoals();
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [startingNumber, setStartingNumber] = useState(0);
  const [currentNumber, setCurrentNumber] = useState('');
  const [targetNumber, setTargetNumber] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGoal = {
      name,
      unit,
      startingNumber: Number(startingNumber),
      currentNumber: Number(currentNumber) || Number(startingNumber),
      targetNumber: Number(targetNumber),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    const addedGoal = await addGoal(newGoal); // Ensure `addGoal` returns the created goal
    setSelectedGoal(addedGoal); // Set newly created goal as active
    onGoalCreated(); // Close the form
  };

  // Handle input change for the name field with autocomplete
  const handleNameChange = (e) => {
    const input = e.target.value;
    setName(capitalizeFirstLetter(input));

    if (input.length > 0) {
      const filteredSuggestions = config.habits.filter((habit) =>
        habit.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (suggestion) => {
    setName(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="new-goal-form">
      <form className="form" onSubmit={handleSubmit}>
        <IoCloseOutline className="close-icon" onClick={onClose} />
        <h2>Create new goal</h2>

        <div className="form-row autocomplete">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name of goal"
            required
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((habit, index) => (
                <div key={index} className="suggestion-item" onClick={() => handleSelectSuggestion(habit)}>
                  {habit}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-row">
          <select value={unit} onChange={(e) => setUnit(e.target.value)} required>
            <option value="" disabled>Select unit of measure</option>
            <option value="reps">Reps</option>
            <option value="minutes">Minutes</option>
            <option value="pages">Pages</option>
          </select>
        </div>

        <div className="form-row">
          <label>Starting number:</label>
          <input
            type="number"
            value={startingNumber}
            onChange={(e) => setStartingNumber(e.target.value)}
            placeholder="Enter starting amount"
            required
          />
        </div>

        <div className="form-row">
          <label>Target number:</label>
          <input
            type="number"
            value={targetNumber}
            onChange={(e) => setTargetNumber(e.target.value)}
            placeholder="Enter target number"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="date-picker">Select start date:</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} required />
        </div>

        <div className="form-row">
          <label htmlFor="date-picker">Select end date:</label>
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} required />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );

  function capitalizeFirstLetter(text) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
};

export default NewGoalForm;