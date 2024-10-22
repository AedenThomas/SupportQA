// src/components/CriteriaConfiguration.js
import React, { useState } from 'react';
import axios from 'axios';

const CriteriaConfiguration = () => {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [question, setQuestion] = useState('');
  const [instructions, setInstructions] = useState('');
  const [evaluationMode, setEvaluationMode] = useState('');
  const [ratingScale, setRatingScale] = useState([]);
  const API_BASE_URL = "http://localhost:5005/api";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/criteria`, {
        name,
        group,
        question,
        instructions,
        evaluationMode,
        ratingScale
      });
      alert('Criteria created successfully');
      // Reset form
    } catch (error) {
      console.error('Error creating criteria:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Criteria Configuration</h2>
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
          <label className="block mb-2">Group</label>
          <input
            type="text"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Evaluation Mode</label>
          <select
            value={evaluationMode}
            onChange={(e) => setEvaluationMode(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Mode</option>
            <option value="binary">Binary (Yes/No)</option>
            <option value="scale">Scale</option>
            <option value="text">Text Input</option>
          </select>
        </div>
        {/* Add UI for rating scale configuration based on evaluationMode */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Criteria
        </button>
      </form>
    </div>
  );
};

export default CriteriaConfiguration;
