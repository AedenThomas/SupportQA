import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5005/api';

const TicketEvaluation = ({ ticketId }) => {
  const [scorecards, setScorecards] = useState([]);
  const [selectedScorecard, setSelectedScorecard] = useState('');
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetchScorecards();
  }, []);

  const fetchScorecards = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/scorecards');
      setScorecards(response.data);
    } catch (error) {
      console.error('Error fetching scorecards:', error);
    }
  };

  const handleEvaluate = async () => {
    if (!ticketId) {
      console.error('No ticket ID provided');
      return;
    }

    try {
      const response = await axios.post(`/api/tickets/${ticketId}/evaluate`, { scorecardId: selectedScorecard });
      setScore(response.data.score);
    } catch (error) {
      console.error('Error evaluating ticket:', error);
    }
  };

  if (!ticketId) {
    return <div>No ticket ID provided</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">Evaluate Ticket</h2>
      <select 
        value={selectedScorecard} 
        onChange={(e) => setSelectedScorecard(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-4"
      >
        <option value="">Select a scorecard</option>
        {scorecards.map((scorecard) => (
          <option key={scorecard._id} value={scorecard._id}>{scorecard.name}</option>
        ))}
      </select>
      <button 
        onClick={handleEvaluate} 
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        disabled={!selectedScorecard}
      >
        Evaluate
      </button>
      {score !== null && <p className="mt-4">Score: {score}</p>}
    </div>
  );
};

export default TicketEvaluation;