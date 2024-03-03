import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGoals } from '../../goalContext'
import './style.scss';


const NewGoalForm = () => {
  const { addGoal } = useGoals();
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('reps'); // Default selection
  const [startingNumber, setStartingNumber] = useState(0);
  const [targetNumber, setTargetNumber] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    addGoal({
      name,
      unit,
      startingNumber,
      targetNumber,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
    // Close modal or reset form here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new goal</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of goal" />
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="reps">Reps</option>
        <option value="minutes">Minutes</option>
        <option value="pages">Pages</option>
      </select>
      <input type="number" value={startingNumber} onChange={(e) => setStartingNumber(parseInt(e.target.value, 10))} placeholder="Enter starting amount" />
      <input type="number" value={targetNumber} onChange={(e) => setTargetNumber(parseInt(e.target.value, 10))} placeholder="Enter target number" />
      <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
      <button type="submit">Create</button>
    </form>
  );
};

export default NewGoalForm;
