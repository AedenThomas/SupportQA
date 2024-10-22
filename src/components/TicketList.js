// src/components/TicketList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const API_BASE_URL = "http://localhost:5005/api";
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tickets`);
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Customer Support Tickets</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Created</th>
            <th className="border p-2">Updated</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Representative</th>
            <th className="border p-2">Evaluator</th>
            <th className="border p-2">Evaluation</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td className="border p-2">{ticket._id}</td>
              <td className="border p-2">{ticket.subject}</td>
              <td className="border p-2">{new Date(ticket.createdAt).toLocaleString()}</td>
              <td className="border p-2">{new Date(ticket.updatedAt).toLocaleString()}</td>
              <td className="border p-2">{ticket.status}</td>
              <td className="border p-2">{ticket.representative}</td>
              <td className="border p-2">{ticket.evaluator}</td>
              <td className="border p-2">
                <Link to={`/tickets/${ticket._id}`} className="text-blue-500 hover:underline">
                  View Evaluation
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;