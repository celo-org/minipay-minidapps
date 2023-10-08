import { utils } from "ethers";

// Mainnet address of cUSD
const CUSD_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

const receiverAddress = "";

// DApp to quickly test transfer of cUSD to a specific address using the cUSD contract.
export default function TransferCUSD() {
    async function transferCUSD() {
        if (window.ethereum) {
            // Get connected accounts, if not connected request connnection.
            // returns an array of accounts
            let accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            // The current selected account out of the connected accounts.
            let userAddress = accounts[0];

            let iface = new utils.Interface([
                "function transfer(address to, uint256 value)",
            ]);

            let calldata = iface.encodeFunctionData("transfer", [
                receiverAddress,
                utils.parseEther("0.1"), // 10 cUSD - This amount is in wei
            ]);

            // Send transaction to the injected wallet to be confirmed by the user.
            let tx = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: userAddress,
                        to: CUSD_ADDRESS, // We need to call the transfer function on the cUSD token contract
                        data: calldata, // Information about which function to call and what values to pass as parameters
                    },
                ],
            });

            // Wait until tx confirmation and get tx receipt
            let receipt = await tx.wait();
        }
    }

    return <button onClick={transferCUSD}>Transfer cUSD</button>;
}
