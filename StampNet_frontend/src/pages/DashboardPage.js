import React, { useState, useEffect } from "react";
import { BrowserProvider, ethers } from "ethers";
import "../styles/dashboard_module.css";
import DashBoardHeader from "../components/DashboardHeader";

// Smart Contract Details
const CONTRACT_ADDRESS = "0xe9d02f9C55Bf9f9F92F9443d0e572339516AaE5F";
const ABI = [
    "function storeHash(bytes32,uint64) external",
    "function hashDocument() external view returns (bytes32, uint64)",
    "function verifyDocument(bytes32,uint64) external view returns (bool)",
    "function getAllStoredHashesAndTimestamps() external view returns (address[], bytes32[], uint64[])"
];

const DashboardPage = () => {
    const [file, setFile] = useState(null);
    const [hash, setHash] = useState("");
    const [transactionHash, setTransactionHash] = useState("");
    const [storedHash, setStoredHash] = useState("");
    const [storedTimestamp, setStoredTimestamp] = useState("");
    const [isVerified, setIsVerified] = useState(null);
    const [walletAddress, setWalletAddress] = useState("");
    

    useEffect(() => {
        console.log("Stored hash updated:", storedHash);
    }, [storedHash]);

    useEffect(() => {
        if (storedHash) {
            setTimeout(() => setStoredHash(storedHash), 100);
        }
    }, [storedHash]);

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
            const currentChainId = await window.ethereum.request({ method: "eth_chainId" });

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
        setStoredHash(hash);  // Update storedHash immediately

        // Fetch timestamp immediately after storing the hash
        await fetchStoredDocument();  

        // Optional UI update delay
        // setTimeout(() => {
        //     alert("✅ Hash stored on blockchain!");
        // }, 100); no need for alert, its causing ui issues on mobile
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
        if (!window.ethereum) {
            console.error("MetaMask is not installed!");
            alert("⚠️ MetaMask is not detected.");
            return;
        }
    
        try {
            // Ensure wallet is connected
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();
            
            if (!walletAddress) {
                alert("⚠️ Please connect your wallet before verifying a document.");
                return;
            }
    
            const contract = await getContract();
            if (!contract) {
                console.error("⚠️ Contract instance is not available.");
                alert("⚠️ Contract not found.");
                return;
            }
    
            console.log("📡 Fetching stored hashes from blockchain...");
    
            // Call the contract function
            const [userAddresses, storedHashes, storedTimestamps] = await contract.getAllStoredHashesAndTimestamps();
    
            console.log("📜 Retrieved Addresses:", userAddresses);
            console.log("🔢 Retrieved Hashes:", storedHashes);
            console.log("🕒 Retrieved Timestamps:", storedTimestamps);
    
            if (userAddresses.length === 0) {
                console.error("⚠️ No stored hashes found.");
                alert("⚠️ No documents found on the blockchain.");
                return;
            }
    
            // Convert user input to match stored format
            const inputHash = hash;  // Ensure this is in bytes32 format
            const userWallet = walletAddress.toLowerCase();  // Convert address to lowercase for comparison
    
            // Find if the stored hash matches the uploaded document's hash
            let isValid = false;
            for (let i = 0; i < userAddresses.length; i++) {
                const storedAddress = userAddresses[i].toLowerCase();
                const storedHash = storedHashes[i];
    
                console.log(`🔍 Checking: Address(${storedAddress}), Hash(${storedHash})`);
    
                if (storedAddress === userWallet && storedHash === inputHash) {
                    isValid = true;
                    break;
                }
            }
    
            setIsVerified(isValid);
            alert(isValid ? "✅ Document is valid!" : "❌ Document is invalid!");
        } catch (error) {
            console.error("🚨 Verification error:", error);
            alert("⚠️ Error verifying document. Please try again.");
        }
    }
    
    
    
    
    
    

    return (
<div className="contents">
                <DashBoardHeader connectWallet={connectWallet} walletAddress={walletAddress} />

                <div className="first">
                    <input type="file" onChange={handleFileChange} />
                    
                    {/* Upload Icon */}
                    <div className="upload-icon">
                        📁
                    </div>
                    
                    <h3>Choose a file or drag it here</h3>
                    <p style={{color: '#64748b', fontSize: '14px', marginBottom: '2em'}}>
                        Upload your document to generate a cryptographic hash and store it on the blockchain
                    </p>
                    
                    {file && (
                        <div id="select-text">
                            <span style={{color: '#3b82f6'}}>📄</span> Selected: {file.name}
                        </div>
                    )}
        
                    {hash && (
                        <div className="hash-container" style={{marginTop: '1.5em'}}>
                            <p style={{color: '#64748b', fontSize: '12px', marginBottom: '0.5em'}}>
                                🔐 Generated Hash:
                            </p>
                            <p className="hash-text">{hash}</p>
                            <button className="copy-button" onClick={() => navigator.clipboard.writeText(hash)}>
                                📋 Copy
                            </button>
                        </div>
                    )}

                    <div className="button-group">
                        <button className="primary-button" onClick={storeDocumentHash} disabled={!hash}>
                            <span style={{marginRight: '8px'}}>🔗</span>
                            Store Hash on Blockchain
                        </button>
                        <button className="tertiary-button" onClick={verifyDocument} disabled={!hash}>
                            <span style={{marginRight: '8px'}}>✅</span>
                            Verify Document
                        </button>
                    </div>
                </div>

                <div className="arrow">
                    <img src="/images/back-arrow-icon.png" alt="Process Flow" />
                </div>

                <div className="second">
                    {/* Blockchain Icon */}
                    <div className="blockchain-icon">
                        ⛓️
                    </div>
                    
                    <h3>Blockchain Data</h3>
                    <p style={{color: '#64748b', fontSize: '14px', marginBottom: '2em'}}>
                        Your document's digital fingerprint stored immutably on the blockchain
                    </p>
                    
                    {storedHash && (
                        <div className="hash-container">
                            <p style={{color: '#64748b', fontSize: '12px', marginBottom: '0.5em'}}>
                                📄 Stored Hash:
                            </p>
                            <p className="hash-text">{storedHash}</p>
                            <button className="copy-button" onClick={() => navigator.clipboard.writeText(storedHash)}>
                                📋 Copy
                            </button>
                        </div>
                    )}
                    
                    {storedTimestamp && (
                        <div style={{
                            padding: '1em',
                            background: 'rgba(30, 41, 59, 0.8)',
                            borderRadius: '12px',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            width: '100%'
                        }}>
                            <p style={{color: '#64748b', fontSize: '12px', marginBottom: '0.5em'}}>
                                🕒 Timestamp:
                            </p>
                            <p style={{color: '#e2e8f0', fontFamily: 'Courier New, monospace'}}>
                                {new Date(parseInt(storedTimestamp) * 1000).toLocaleString()}
                            </p>
                        </div>
                    )}
                    
                    {isVerified !== null && (
                        <div className={`status-indicator ${isVerified ? 'status-valid' : 'status-invalid'}`}>
                            <span>{isVerified ? "✅" : "❌"}</span>
                            Verification Result: {isVerified ? "Valid" : "Invalid"}
                        </div>
                    )}

                    {transactionHash && (
                        <div className="hash-container">
                            <p style={{color: '#64748b', fontSize: '12px', marginBottom: '0.5em'}}>
                                🔗 Transaction Hash:
                            </p>
                            <p className="hash-text">{transactionHash}</p>
                            <button className="copy-button" onClick={() => navigator.clipboard.writeText(transactionHash)}>
                                📋 Copy
                            </button>
                        </div>
                    )}
                    
                    {!storedHash && !transactionHash && (
                        <div style={{
                            padding: '2em',
                            textAlign: 'center',
                            color: '#64748b',
                            fontStyle: 'italic'
                        }}>
                            <p>No blockchain data yet</p>
                            <p style={{fontSize: '12px', marginTop: '0.5em'}}>
                                Upload and store a document to see blockchain information
                            </p>
                        </div>
                    )}
                </div>
            </div>
    );
};

export default DashboardPage;
