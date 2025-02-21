require('dotenv').config({ path: './contract.env' });
const { ethers } = require("ethers");

const RPC_URL = process.env.ARBITRUM_SEPOLIA_RPC; // Your Infura/Alchemy RPC
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Your wallet private key
const CONTRACT_ADDRESS = "0xB6F09ce47e46C0eFf03d4bdD383f424Fa1AC7CF6"; 

const abi = [
    "function storeHash(bytes32,uint64) external",
    "function hashDocument() external view returns (bytes32, uint64)",
    "function verifyDocument(bytes32,uint64) external view returns (bool)"
];

async function main() {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

    // Store a document hash
    const hash = "0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234";
    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp
    const tx = await contract.storeHash(hash, timestamp);
    await tx.wait();
    console.log("✅ Hash stored!");

    // Retrieve stored document hash
    const [storedHash, storedTimestamp] = await contract.hashDocument();
    console.log(`📄 Stored Hash: ${storedHash}`);
    console.log(`🕒 Timestamp: ${storedTimestamp}`);

    // Verify the document
    const isValid = await contract.verifyDocument(hash, timestamp);
    console.log(`✅ Verification result: ${isValid}`);
}

main().catch(console.error);
