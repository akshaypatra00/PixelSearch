
import React, { useEffect, useState } from "react";
import axios from "axios";


const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function getHistory() {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:3000/api/auth/history",
        {
          withCredentials: true
        }
      );
       console.log(response)
      setHistory(response.data.history || []);

    } catch (err) {
      console.log(err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Unable to fetch history"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="history-page">

      <div className="history-header">
        <div>
          <h1>Search History</h1>
          <p>Your recently searched images</p>
        </div>

        <button onClick={getHistory}>
          Refresh
        </button>
      </div>

      {loading && (
        <div className="history-message">
          Loading your history...
        </div>
      )}

      {error && (
        <div className="history-message error">
          {error}
        </div>
      )}

      {!loading && !error && history.length === 0 && (
        <div className="history-empty">
          <h2>No search history yet</h2>
          <p>Your searches will appear here.</p>
        </div>
      )}

      {!loading && history.length > 0 && (
        <div className="history-list">
          {history.map((item) => (
            <div className="history-card" key={item._id}>

              <div className="history-icon">
                <span>⌕</span>
              </div>

              <div className="history-details">
                <h3>{item.history}</h3>

                <p>
                  {item.saveDate
                    ? new Date(item.saveDate).toLocaleString()
                    : "Date unavailable"}
                </p>
              </div>

              <div className="history-arrow">
                →
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default HistoryPage;
