import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import "../styles/MyTimestamps.css"; // Import the CSS file
import DashBoardHeader from "../components/DashboardHeader"; // ✅ Keep DashBoardHeader
import DashboardFooter from "../components/DashboardFooter";

const CONTRACT_ADDRESS = "0xe9d02f9C55Bf9f9F92F9443d0e572339516AaE5F";
const ABI = [
  "function getAllStoredHashesAndTimestamps() external view returns (address[], bytes32[], uint64[])"
];

const MyTimestamps = () => {
  const [allStoredData, setAllStoredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllStoredDocuments();
  }, []);

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
      }));
  
      setAllStoredData(formattedData);
      console.log("Formatted Data:", formattedData);
  
    } catch (error) {
      console.error("Error fetching stored documents:", error);
      alert(`Failed to fetch stored documents: ${error.message}`);
    }
  
    setLoading(false);
  }
  

  return (
    <div className="timestamps-container">
      {/* ✅ Add Dashboard Header */}
      <DashBoardHeader /> 

      <h2>📜 Stored Timestamps</h2>
      <button onClick={() => navigate("/dashboard")}>🔙 Back to Dashboard</button>

      {loading ? (
        <p>Loading...</p>
      ) : allStoredData.length > 0 ? (
        <div className="timestamps-table-container">
          <table className="timestamps-table">
            <thead>
              <tr>
                <th>Owner</th>
                <th>Hash</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {allStoredData.map((data, index) => (
                <tr key={index}>
                  <td>{data.owner}</td>
                  <td>{data.hash}</td>
                  <td>{data.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data">No stored timestamps found.</p>
      )}
    </div>
  );
};
export default MyTimestamps;
