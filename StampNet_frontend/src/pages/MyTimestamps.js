import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import "../styles/MyTimestamps.css"; // Import the enhanced CSS file
import DashBoardHeader from "../components/DashboardHeader";
import DashboardFooter from "../components/DashboardFooter";

const CONTRACT_ADDRESS = "0xe9d02f9C55Bf9f9F92F9443d0e572339516AaE5F";
const ABI = [
  "function getAllStoredHashesAndTimestamps() external view returns (address[], bytes32[], uint64[])"
];

const MyTimestamps = () => {
  const [allStoredData, setAllStoredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalRecords: 0,
    uniqueOwners: 0,
    latestTimestamp: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllStoredDocuments();
  }, []);

  useEffect(() => {
    // Calculate stats when data changes
    if (allStoredData.length > 0) {
      const uniqueOwners = new Set(allStoredData.map(item => item.owner)).size;
      const timestamps = allStoredData.map(item => new Date(item.rawTimestamp * 1000));
      const latestTimestamp = new Date(Math.max(...timestamps));
      
      setStats({
        totalRecords: allStoredData.length,
        uniqueOwners,
        latestTimestamp: latestTimestamp.toLocaleDateString()
      });
    }
  }, [allStoredData]);

  async function getContract() {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return null;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  }

  async function fetchAllStoredDocuments() {
    setLoading(true);
  
    // Ensure MetaMask is installed
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it and try again.");
      setLoading(false);
      return;
    }
  
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Ensure MetaMask is connected
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length === 0) {
        alert("Please connect MetaMask to continue.");
        setLoading(false);
        return;
      }
  
      // Connect to the contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      console.log("Connected to contract:", contract);
  
      // Fetch data from contract
      const [owners, hashes, timestamps] = await contract.getAllStoredHashesAndTimestamps();
  
      // Log raw data for debugging
      console.log("Raw Data:", { owners, hashes, timestamps });
  
      // Format data
      const formattedData = owners.map((owner, index) => ({
        owner,
        hash: hashes[index],
        timestamp: new Date(Number(timestamps[index]) * 1000).toLocaleString(),
        rawTimestamp: Number(timestamps[index])
      }));

      // Sort by timestamp (newest first)
      formattedData.sort((a, b) => b.rawTimestamp - a.rawTimestamp);
  
      setAllStoredData(formattedData);
      console.log("Formatted Data:", formattedData);
  
    } catch (error) {
      console.error("Error fetching stored documents:", error);
      alert(`Failed to fetch stored documents: ${error.message}`);
    }
  
    setLoading(false);
  }

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const truncateHash = (hash) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('Copied to clipboard:', text);
    });
  };

  return (
    <>
      <DashBoardHeader />
      
      <div className="timestamps-container">
        <div className="timestamps-header">
          <h1 className="timestamps-title">
            🔗 Blockchain Timestamps
          </h1>
          <p className="timestamps-subtitle">
            Immutable records secured on the blockchain
          </p>
        </div>

        {/* Stats Cards */}
        {allStoredData.length > 0 && (
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">{stats.totalRecords}</div>
              <div className="stat-label">Total Records</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.uniqueOwners}</div>
              <div className="stat-label">Unique Owners</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.latestTimestamp}</div>
              <div className="stat-label">Latest Record</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>
          <button 
            className="btn" 
            onClick={fetchAllStoredDocuments}
            disabled={loading}
          >
            🔄 Refresh Data
          </button>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Fetching blockchain data...</p>
          </div>
        ) : allStoredData.length > 0 ? (
          <div className="timestamps-table-container">
            <table className="timestamps-table">
              <thead>
                <tr>
                  <th>Owner Address</th>
                  <th>Document Hash</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {allStoredData.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <div 
                        className="owner-cell"
                        onClick={() => copyToClipboard(data.owner)}
                        title={`Click to copy: ${data.owner}`}
                        style={{ cursor: 'pointer' }}
                      >
                        {truncateAddress(data.owner)}
                      </div>
                    </td>
                    <td>
                      <div 
                        className="hash-cell"
                        onClick={() => copyToClipboard(data.hash)}
                        title={`Click to copy: ${data.hash}`}
                        style={{ cursor: 'pointer' }}
                      >
                        {truncateHash(data.hash)}
                      </div>
                    </td>
                    <td>
                      <div className="timestamp-cell">
                        {data.timestamp}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data">
            <div className="no-data-icon">📭</div>
            <p>No blockchain timestamps found</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '1rem' }}>
              Records will appear here once documents are stored on the blockchain
            </p>
          </div>
        )}
      </div>

      <DashboardFooter />
    </>
  );
};

export default MyTimestamps;