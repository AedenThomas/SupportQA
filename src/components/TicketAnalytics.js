// src/components/TicketAnalytics.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5005/api/ticket-analytics');
      setAnalytics(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ticket analytics:', error);
      setError('Failed to fetch analytics data');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading ticket analytics...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">Ticket Analytics</h2>
      <div>
        <p>Total Tickets: {analytics.totalTickets || 'N/A'}</p>
        <p>Average Score: {analytics.averageScore ? analytics.averageScore.toFixed(2) : 'N/A'}</p>
        <h3 className="font-bold mt-4 mb-2">Sentiment Distribution:</h3>
        {analytics.sentimentDistribution ? (
          <ul className="space-y-1">
            {Object.entries(analytics.sentimentDistribution).map(([sentiment, count]) => (
              <li key={sentiment} className="flex justify-between">
                <span>{sentiment}:</span>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sentiment data available</p>
        )}
      </div>
    </div>
  );
};

export default TicketAnalytics;
