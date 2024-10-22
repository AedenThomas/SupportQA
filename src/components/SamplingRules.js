// src/components/SamplingRules.js
import React, { useState } from 'react';
import axios from 'axios';

const SamplingRules = () => {
  const [ruleName, setRuleName] = useState('');
  const [description, setDescription] = useState('');
  const [conditions, setConditions] = useState([{ field: '', operator: '', value: '' }]);

  const handleAddCondition = () => {
    setConditions([...conditions, { field: '', operator: '', value: '' }]);
  };

  const handleConditionChange = (index, field, value) => {
    const newConditions = [...conditions];
    newConditions[index][field] = value;
    setConditions(newConditions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/sampling-rules`, { name: ruleName, description, conditions });
      alert('Sampling rule created successfully');
      // Reset form
      setRuleName('');
      setDescription('');
      setConditions([{ field: '', operator: '', value: '' }]);
    } catch (error) {
      console.error('Error creating sampling rule:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Create Sampling Rule</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block mb-2">Rule Name</label>
          <input
            type="text"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
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
        <h3 className="text-xl font-semibold mb-2">Conditions</h3>
        {conditions.map((condition, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <select
              value={condition.field}
              onChange={(e) => handleConditionChange(index, 'field', e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2"
            >
              <option value="">Select Field</option>
              <option value="subject">Subject</option>
              <option value="status">Status</option>
              <option value="representative">Representative</option>
            </select>
            <select
              value={condition.operator}
              onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2"
            >
              <option value="">Select Operator</option>
              <option value="equals">Equals</option>
              <option value="contains">Contains</option>
              <option value="startsWith">Starts With</option>
            </select>
            <input
              type="text"
              value={condition.value}
              onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2"
              placeholder="Value"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddCondition}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Condition
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Rule
        </button>
      </form>
    </div>
  );
};

export default SamplingRules;