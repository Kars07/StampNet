import React, { useState } from "react";
import { ethers } from "ethers";
import "../styles/dashboard_module.css";
import DashBoardHeader from "../components/DashboardHeader";

// Smart Contract Details
const CONTRACT_ADDRESS = "0xe9d02f9C55Bf9f9F92F9443d0e572339516AaE5F";
const ABI = [
    "function storeHash(bytes32,uint64) external",
    "function hashDocument() external view returns (bytes32, uint64)",
    "function verifyDocument(bytes32,uint64) external view returns (bool)"
];

const DashboardPage = () => {
    const [file, setFile] = useState(null);
    const [hash, setHash] = useState("");
    const [transactionHash, setTransactionHash] = useState("");
    const [storedHash, setStoredHash] = useState("");
    const [storedTimestamp, setStoredTimestamp] = useState("");
    const [isVerified, setIsVerified] = useState(null);
    const [walletAddress, setWalletAddress] = useState("");

    // Function to handle file selection
    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const fileHash = await generateSHA256Hash(selectedFile);
            setHash(fileHash);
        }
    };

    // Function to generate SHA-256 hash
    async function generateSHA256Hash(file) {
        const arrayBuffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return "0x" + hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    }

    // Connect Wallet
    async function connectWallet() {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setWalletAddress(accounts[0]);
        } catch (error) {
            console.error("Wallet connection error:", error);
        }
    }

    // Connect to Ethereum and get contract instance
    async function getContract() {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return null;
        }

        const ARBITRUM_SEPOLIA_CHAIN_ID = "0x66eee"; // Chain ID for Arbitrum Sepolia

        try {
            // Get current network
            const currentChainId = await window.ethereum.request({ method: "eth_chainId" });

            // If not on Arbitrum Sepolia, request network switch
            if (currentChainId !== ARBITRUM_SEPOLIA_CHAIN_ID) {
                try {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: ARBITRUM_SEPOLIA_CHAIN_ID }]
                    });
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [{
                                chainId: ARBITRUM_SEPOLIA_CHAIN_ID,
                                chainName: "Arbitrum Sepolia",
                                nativeCurrency: {
                                    name: "Ethereum",
                                    symbol: "ETH",
                                    decimals: 18
                                },
                                rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc"],
                                blockExplorerUrls: ["https://sepolia.arbiscan.io/"]
                            }]
                        });
                    } else {
                        console.error("Error switching network:", switchError);
                        alert("Failed to switch to Arbitrum Sepolia. Please switch manually.");
                        return null;
                    }
                }
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        } catch (error) {
            console.error("Error getting contract:", error);
            return null;
        }
    }

    // Store file hash on blockchain
    async function storeDocumentHash() {
        if (!walletAddress) {
            await connectWallet();
        }

        const contract = await getContract();
        if (!contract) return;

        try {
            const timestamp = Math.floor(Date.now() / 1000);
            const tx = await contract.storeHash(hash, timestamp);
            await tx.wait();

            setTransactionHash(tx.hash);
            alert("✅ Hash stored on blockchain!");
        } catch (error) {
            console.error("Blockchain error:", error);
        }
    }

    // Retrieve stored document hash & timestamp
    async function fetchStoredDocument() {
        const contract = await getContract();
        if (!contract) return;

        try {
            const [retrievedHash, retrievedTimestamp] = await contract.hashDocument();
            setStoredHash(retrievedHash);
            setStoredTimestamp(retrievedTimestamp.toString());
        } catch (error) {
            console.error("Error fetching stored hash:", error);
            setStoredTimestamp("Error fetching timestamp");
        }
    }

    // Verify if uploaded document matches stored hash
    async function verifyDocument() {
        const contract = await getContract();
        if (!contract) return;

        try {
            const [retrievedHash, retrievedTimestamp] = await contract.hashDocument();
            const result = await contract.verifyDocument(hash, retrievedTimestamp);

            setIsVerified(result);
            alert(result ? "✅ Document is valid!" : "❌ Document is invalid!");
        } catch (error) {
            console.error("Verification error:", error);
        }
    }

    return (
        <div className="contents">
            <DashBoardHeader connectWallet={connectWallet} walletAddress={walletAddress} />

            <div className="first">
                <input type="file" onChange={handleFileChange} />
                <h3>Choose a file or drag it here</h3>
                {file && <p id="select-text">Selected: {file.name}</p>}
    
                {hash && (
                    <div className="hash-container">
                        <p className="hash-text">{hash}</p>
                        <button className="copy-button" onClick={() => navigator.clipboard.writeText(hash)}>📋 Copy</button>
                    </div>
                )}

                <div className="button-group">
                    <button className="primary-button" onClick={storeDocumentHash} disabled={!hash}>Store Hash</button>
                    <button className="secondary-button" onClick={fetchStoredDocument}>Fetch Stored Hash</button>
                    <button className="tertiary-button" onClick={verifyDocument} disabled={!hash}>Verify Document</button>
                </div>
            </div>


            <div className="arrow">
                <img src="/images/back-arrow-icon.png" alt="Back Arrow" />
            </div>

            <div className="second">
                <h3>Blockchain Data</h3>
                <p>📄 Stored Hash: {storedHash || "Not Fetched"}</p>
                <p>🕒 Timestamp: {storedTimestamp || "Not Fetched"}</p>
                {isVerified !== null && <p>✅ Verification Result: {isVerified ? "Valid" : "Invalid"}</p>}
                {transactionHash && <p>🔗 Transaction: {transactionHash}</p>}
            </div>
        </div>
    );
};

export default DashboardPage;