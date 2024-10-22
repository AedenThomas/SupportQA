// src/components/ScorecardForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ScorecardForm = () => {
  const [name, setName] = useState('');
  const [criteria, setCriteria] = useState([{ name: '', weight: 0, description: '' }]);
  const [error, setError] = useState('');

  const handleCriteriaChange = (index, field, value) => {
    const newCriteria = [...criteria];
    newCriteria[index][field] = value;
    setCriteria(newCriteria);
  };

  const addCriterion = () => {
    setCriteria([...criteria, { name: '', weight: 0, description: '' }]);
  };

  const removeCriterion = (index) => {
    const newCriteria = criteria.filter((_, i) => i !== index);
    setCriteria(newCriteria);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Scorecard name is required');
      return;
    }

    if (criteria.some(c => !c.name.trim() || c.weight <= 0)) {
      setError('All criteria must have a name and a positive weight');
      return;
    }

    try {
      await axios.post('http://localhost:5005/api/scorecards', { name, criteria });
      alert('Scorecard created successfully');
      setName('');
      setCriteria([{ name: '', weight: 0, description: '' }]);
    } catch (error) {
      console.error('Error creating scorecard:', error);
      setError('Failed to create scorecard. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">Create Scorecard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Scorecard Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {criteria.map((criterion, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <input
              type="text"
              placeholder="Criterion Name"
              value={criterion.name}
              onChange={(e) => handleCriteriaChange(index, 'name', e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2"
              required
            />
            <input
              type="number"
              placeholder="Weight"
              value={criterion.weight}
              onChange={(e) => handleCriteriaChange(index, 'weight', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border rounded mb-2"
              required
              min="0"
              step="0.1"
            />
            <textarea
              placeholder="Description"
              value={criterion.description}
              onChange={(e) => handleCriteriaChange(index, 'description', e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2"
            />
            {criteria.length > 1 && (
              <button type="button" onClick={() => removeCriterion(index)} className="text-red-500">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addCriterion} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
          Add Criterion
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Scorecard
        </button>
      </form>
    </div>
  );
};

export default ScorecardForm;
