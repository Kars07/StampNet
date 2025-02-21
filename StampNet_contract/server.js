const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();
const { hashDocument, verifyDocument } = require("./contract");

const app = express();
app.use(express.json());

app.get("/hash-document", async (req, res) => {
    try {
        const result = await hashDocument();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/verify-document", async (req, res) => {
    try {
        const { hash } = req.body;
        if (!hash) return res.status(400).json({ error: "Missing document hash" });

        const isVerified = await verifyDocument(hash);
        res.json({ verified: isVerified });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
