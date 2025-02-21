require("dotenv").config();
const { ethers } = require("ethers");

// Load environment variables
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = "0x85d9a8a4bd77b9b5559c1b7fcb8ec9635922ed49";
const ABI = require("./contractABI.json"); // Ensure ABI file exists

// Set up provider and wallet
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

// Function to hash a document
async function hashDocument() {
    try {
        const result = await contract.hashDocument();
        console.log("Document Hash:", result[0], "Timestamp:", result[1]);
        return { hash: result[0], timestamp: result[1] };
    } catch (error) {
        console.error("Error calling hashDocument:", error);
    }
}

// Function to verify a document hash
async function verifyDocument(hash) {
    try {
        const isVerified = await contract.verifyDocument(hash);
        console.log("Verification Result:", isVerified);
        return isVerified;
    } catch (error) {
        console.error("Error verifying document:", error);
    }
}

// Export functions for use in the backend API
module.exports = { hashDocument, verifyDocument };
