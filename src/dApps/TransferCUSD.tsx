import React, { useState } from 'react';
import { utils } from 'ethers';

// Mainnet address of cUSD
const CUSD_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

// Dummy receiver address for demo purpose
const receiverAddress = "0xFEeEB43FFC9f947413009864d00Ccf9B9146A55d";

// MiniPay specific functionality and state management
const TransferCUSD = ({ }) => {
    const [transactionStatus, setTransactionStatus] = useState('');

    // Function to initiate the transfer of cUSD
    const transferCUSD = async () => {
        try {
            if (!window.ethereum) {
                throw new Error('MetaMask or another Web3 provider is not installed');
            }

            // Request user's Ethereum accounts
            let accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            let userAddress = accounts[0];

            // Prepare the transaction data
            let iface = new utils.Interface([
                "function transfer(address to, uint256 value)",
            ]);
            const calldata = iface.encodeFunctionData("transfer", [
                receiverAddress,
                utils.parseEther("0.1"), // 10 cUSD - This amount is in wei
            ]);

            // Send transaction to the cUSD contract
            let tx = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: userAddress,
                        to: CUSD_ADDRESS,
                        data: calldata,
                    },
                ],
            });

            // Update transaction status
            setTransactionStatus(`Transaction sent: ${tx.hash}`);
            
            // Wait for transaction confirmation and get receipt
            const receipt = await tx.wait();
            setTransactionStatus(`Transaction confirmed: ${receipt.transactionHash}`);
            
            // Optionally: Update MiniPay's internal state or notify the user
        } catch (error) {
            console.error('Error occurred during transaction:', error);
            // Check if error is an instance of Error and has a message property
            if (error instanceof Error) {
                setTransactionStatus(`Transaction failed: ${error.message}`);
            } else {
                // Handle cases where error is not an Error object
                setTransactionStatus('Transaction failed: An unknown error occurred');
            }
        }
    };

    return (
        <div>
            <button onClick={transferCUSD}>Transfer 0.1 cUSD</button>
            {transactionStatus && <p>{transactionStatus}</p>}
        </div>
    );
};

export default TransferCUSD;
