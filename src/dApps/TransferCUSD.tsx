import { ethers } from "ethers";
import React, { useState } from "react";

// Mainnet address of cUSD
const CUSD_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

// DApp to quickly test transfer of cUSD to a specific address using the cUSD contract.
export default function TransferCUSD() {
    const [userAddress, setUserAddress] = useState<string>("");
    const [receiverAddress, setReceiverAddress] = useState<string>("");
    const [transactionStatus, setTransactionStatus] = useState<string>("");

    async function transferCUSD() {
        try {
            const ethereum = window.ethereum;
            if (!ethereum) {
                throw new Error("MetaMask not detected. Please install MetaMask.");
            }

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setUserAddress(accounts[0]);

            const provider = new ethers.providers.Web3Provider(ethereum);
            

            const cUSDContract = new ethers.Contract(
                CUSD_ADDRESS,
                ["function balanceOf(address account) view returns (uint256)"],
                provider
            );
            
            const balance = await cUSDContract.balanceOf(accounts[0]);
            const transferAmount = ethers.utils.parseEther("0.1");

            if (balance.lt(transferAmount)) {
                throw new Error("Insufficient balance to transfer."); // Check if user has enough balance
            }

            const tx = await cUSDContract.transfer(receiverAddress, transferAmount).send({
                gasLimit: 300000,  // Adjust gas limit as needed
            });
            
            await provider.waitForTransaction(tx.hash);

            setTransactionStatus(`Transaction successful!!`);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error transferring cUSD:", error);
                setTransactionStatus(`Error: ${error.message}`);
            }
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {userAddress && <p>Your Address: {userAddress}</p>}
            <input
                type="text"
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                placeholder="Receiver's Address"
                style={{ 
                    marginBottom: "10px", 
                    borderRadius: "10px",
                    padding: "5px",
                    width: "200px",
                    border: "2px solid green",
                }}
            />
            <button 
                className="transfer" 
                onClick={transferCUSD} 
                style={{ 
                    marginBottom: "10px", 
                    borderRadius: "10px", 
                    border: "1px solid green",
                    backgroundColor: "green",
                    color: "white",
                    padding: "5px",
                    width: "200px",
                }}
            >
                Transfer cUSD
            </button>
            {transactionStatus && <p>{transactionStatus}</p>}
        </div>
    );
}
