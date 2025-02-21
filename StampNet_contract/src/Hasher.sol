// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./IHasher.sol";

contract Hasher is IHasher {
    bytes32 private storedHash;
    uint64 private storedTimestamp;

    function hashDocument() external view override returns (bytes32, uint64) {
        return (storedHash, storedTimestamp);
    }

    function verifyDocument(bytes32 expected_hash, uint64 expected_timestamp) external view override returns (bool) {
        return (storedHash == expected_hash && storedTimestamp == expected_timestamp);
    }

    function storeHash(bytes32 hash, uint64 timestamp) external {
        storedHash = hash;
        storedTimestamp = timestamp;
    }
}
