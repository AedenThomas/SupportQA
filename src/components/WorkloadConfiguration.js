// src/components/WorkloadConfiguration.js
import React, { useState } from 'react';
import axios from 'axios';

const WorkloadConfiguration = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [passRate, setPassRate] = useState(0);
  const [criteria, setCriteria] = useState([{ name: '', maxScore: 0 }]);
  const [evaluationType, setEvaluationType] = useState('hybrid');

  const handleAddCriterion = () => {
    setCriteria([...criteria, { name: '', maxScore: 0 }]);
  };

  const handleCriterionChange = (index, field, value) => {
    const newCriteria = [...criteria];
    newCriteria[index][field] = value;
    setCriteria(newCriteria);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/workloads`, {
        name,
        description,
        passRate,
        criteria,
        evaluationType
      });
      alert('Workload configuration saved successfully');
      // Reset form
    } catch (error) {
      console.error('Error saving workload configuration:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Workload Configuration</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Pass Rate (%)</label>
          <input
            type="number"
            value={passRate}
            onChange={(e) => setPassRate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            min="0"
            max="100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Evaluation Type</label>
          <select
            value={evaluationType}
            onChange={(e) => setEvaluationType(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            >
              <option value="hybrid">Hybrid (AI + Human)</option>
              <option value="ai">AI Only</option>
              <option value="human">Human Only</option>
            </select>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Evaluation Criteria</h3>
            {criteria.map((criterion, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <input
                  type="text"
                  placeholder="Criterion Name"
                  value={criterion.name}
                  onChange={(e) => handleCriterionChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border rounded mb-2"
                  required
                />
                <input
                  type="number"
                  placeholder="Max Score"
                  value={criterion.maxScore}
                  onChange={(e) => handleCriterionChange(index, 'maxScore', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border rounded"
                  min="0"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddCriterion}
              className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
              Add Criterion
            </button>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Workload Configuration
          </button>
        </form>
      </div>
    );
  };
  
  export default WorkloadConfiguration;
  