// src/components/WorkloadDistribution.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkloadDistribution = () => {
  const [distribution, setDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDistribution();
  }, []);

  const fetchDistribution = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5005/api/workload-distribution');
      setDistribution(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workload distribution:', error);
      setError('Failed to fetch workload distribution');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading workload distribution...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">Workload Distribution</h2>
      {distribution.length === 0 ? (
        <p>No workload distribution data available.</p>
      ) : (
        <ul className="space-y-2">
          {distribution.map((item) => (
            <li key={item._id} className="flex justify-between">
              <span>{item._id}:</span>
              <span>{item.count} tickets</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkloadDistribution;
