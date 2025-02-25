require('dotenv').config({ path: './contract.env' });
const { ethers } = require("ethers");

const RPC_URL = process.env.ARBITRUM_SEPOLIA_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = "0xe9d02f9C55Bf9f9F92F9443d0e572339516AaE5F";

const abi = [
    "function storeHash(bytes32,uint64) external",
    "function hashDocument() external view returns (bytes32, uint64)",
    "function verifyDocument(bytes32,uint64) external view returns (bool)",
    "function getAllStoredHashesAndTimestamps() external view returns (address[], bytes32[], uint64[])"
];

async function main() {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

    // Store a document hash
    const hash = "0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234";
    const timestamp = Math.floor(Date.now() / 1000);
    const tx = await contract.storeHash(hash, timestamp);
    await tx.wait();
    console.log("✅ Hash stored!");

    // Retrieve the latest stored document hash
    const [storedHash, storedTimestamp] = await contract.hashDocument();
    console.log(`📄 Stored Hash: ${storedHash}`);
    console.log(`🕒 Timestamp: ${storedTimestamp}`);

    // Verify the document
    const isValid = await contract.verifyDocument(hash, timestamp);
    console.log(`✅ Verification result: ${isValid}`);

    // Retrieve all stored hashes and timestamps
    const [owners, hashes, timestamps] = await contract.getAllStoredHashesAndTimestamps();
    console.log("📜 All stored hashes and timestamps:");
    owners.forEach((owner, index) => {
        console.log(`Owner: ${owner}, Hash: ${hashes[index]}, Timestamp: ${timestamps[index]}`);
    });
}

main().catch(console.error);
