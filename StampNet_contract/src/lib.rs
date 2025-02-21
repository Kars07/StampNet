#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
extern crate alloc;



use stylus_sdk::{abi::Bytes, alloy_primitives::{FixedBytes, U256}, block::{self, timestamp}, crypto::keccak, msg, prelude::*};
use alloc::string::String;
use stylus_sdk::stylus_proc::entrypoint;
use alloc::vec::Vec;
use alloy_sol_types::{sol_data::{Address as SOLAddress, String as SOLString, Bytes as SOLBytes, *}, SolType};
use stylus_sdk::alloy_primitives::Address;




#[storage]
#[entrypoint]
pub struct Hasher{
}
#[public]
impl Hasher {
    pub fn hash_document(
        &self,           
    )-> (FixedBytes<32>, u64) {

        let uploader: Address = msg::sender();
        let timestamps: u64 = block::timestamp();
        let document: U256 = U256::from(1740061866);
        let func: String = String::from("storeDocument");
        let data: Bytes = Bytes::from(b"Sample document text".to_vec());

        //Encode the data
        type TxIdHashType = (SOLAddress, Uint<64>, Uint<256>, SOLString, SOLBytes);
        let tx_hash_data = (uploader, timestamps, document, func, data);
        let tx_hash_data_encode_packed = TxIdHashType::abi_encode_packed(&tx_hash_data);

        //Return the Keccak256 hash and timestamp
        let document_hash: FixedBytes<32> = keccak(tx_hash_data_encode_packed).into();

        (document_hash, timestamps)
        

    }  

    pub fn verify_document(
        &self,
        expected_hash: FixedBytes<32>,
        expected_timestamp: u64
    ) -> bool {
        
        // Retrieve the uploader
        let uploader: Address = msg::sender();
       
        // Sample document identifier and function (ensure it matches how hash_document is used)
        let document: U256 = U256::from(1740061866);
        let func: String = String::from("storeDocument");
        let data: Bytes = Bytes::from(b"Sample document text".to_vec());

        //Encode the data
        type TxIdHashType = (SOLAddress, Uint<64>, Uint<256>, SOLString, SOLBytes);
        let tx_hash_data = (uploader, expected_timestamp, document, func, data);
        let tx_hash_data_encode_packed = TxIdHashType::abi_encode_packed(&tx_hash_data);

        //compute and compare the hash

        let computed_hash: FixedBytes<32> = keccak(tx_hash_data_encode_packed).into();
        computed_hash == expected_hash
    }

}
