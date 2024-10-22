import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import ScorecardForm from "./ScorecardForm";
import TicketEvaluation from "./TicketEvaluation";
import WorkloadDistribution from "./WorkloadDistribution";
import TicketAnalytics from "./TicketAnalytics";
import ReactMarkdown from "react-markdown";

const API_BASE_URL = "http://localhost:5005/api";

const TryNowPage = () => {
  const [companyName, setCompanyName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [ticketId, setTicketId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect triggered. id:", id);
    fetchTickets();
    if (id) {
      console.log("Fetching ticket with ID:", id);
      fetchTicket(id);
    } else {
      console.log("No ticket ID provided in URL");
      setTicketId(null);
      setCompanyName("");
      setProductDetails("");
      setChatHistory([]);
    }
  }, [id]);
  

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tickets`);
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setError("Failed to fetch tickets. Please try again.");
    }
  };

  const fetchTicket = async (ticketId) => {
    try {
      setLoading(true);
      console.log("Fetching ticket data for ID:", ticketId);
      const response = await axios.get(`${API_BASE_URL}/tickets/${ticketId}`);
      const ticket = response.data;
      console.log("Fetched ticket data:", ticket);
      setTicketId(ticket._id);
      setCompanyName(ticket.companyName);
      setProductDetails(ticket.productDetails);
      setChatHistory(ticket.chatHistory || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching ticket:", error);
      setError("Failed to fetch ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Creating new ticket");
      const response = await axios.post(`${API_BASE_URL}/tickets`, {
        companyName,
        productDetails,
      });
      console.log("New ticket created:", response.data);
      setTicketId(response.data.ticketId);
      setChatHistory([]);
      navigate(`/try-now/${response.data.ticketId}`);
      fetchTickets();
      setError(null);
    } catch (error) {
      console.error("Error creating ticket:", error);
      setError("Failed to create ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const newUserMessage = { role: "user", content: message };
    setChatHistory((prevHistory) => [...prevHistory, newUserMessage]);
    setMessage("");
    setLoading(true);

    try {
      console.log("Sending message for ticket ID:", ticketId);
      const response = await axios.post(
        `${API_BASE_URL}/tickets/${ticketId}/messages`,
        { message }
      );
      setChatHistory(response.data.chatHistory);
      setError(null);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "system", content: "Error: Failed to send message" },
      ]);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Try SupportQA Now</h1>
        <p className="mb-4">Current Ticket ID: {ticketId || "None"}</p>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {!ticketId ? (
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  <label htmlFor="companyName" className="block text-gray-700 font-bold mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="productDetails" className="block text-gray-700 font-bold mb-2">
                    Product Details
                  </label>
                  <textarea
                    id="productDetails"
                    value={productDetails}
                    onChange={(e) => setProductDetails(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Start AI Interaction"}
                </button>
              </form>
            ) : (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md mb-4 h-96 overflow-y-auto">
                  {chatHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${
                        msg.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <span
                        className={`inline-block p-2 rounded-lg ${
                          msg.role === "user" ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        {msg.role === "user" ? (
                          msg.content
                        ) : (
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex mb-4">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow px-3 py-2 border rounded-l-lg"
                    placeholder="Type your message..."
                    disabled={loading}
                  />
                  <button
                    onClick={handleSendMessage}
                    className={`px-4 py-2 rounded-r-lg ${
                      loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                    } text-white`}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </div>

                <TicketEvaluation ticketId={ticketId} />
              </>
            )}
          </div>
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Previous Tickets</h2>
              {tickets.length > 0 ? (
                <ul className="space-y-2">
                  {tickets.map((ticket) => (
                    <li key={ticket._id}>
                      <button
                        onClick={() => navigate(`/try-now/${ticket._id}`)}
                        className="text-blue-500 hover:underline"
                      >
                        {ticket.companyName} - {new Date(ticket.createdAt).toLocaleDateString()}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No previous tickets found.</p>
              )}
            </div>
            <ScorecardForm />
            <WorkloadDistribution />
            <TicketAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryNowPage;