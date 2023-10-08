import { utils } from "ethers";

// Testnet contract address with mint function that transfers 0.01 cUSD for minting tokens.
const CONTRACT_ADDRESS = "0xFEeEB43FFC9f947413009864d00Ccf9B9146A55d";

// A function call that requires transfer of cUSD
export default function PayTokenFunctionCall() {
    async function callMint() {
        if (window.ethereum) {
            let accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            // The current selected account out of the connected accounts.
            let userAddress = accounts[0];

            let iface = new utils.Interface(["function mint(address to)"]);

            let calldata = iface.encodeFunctionData("mint", [userAddress]);

            // Send transaction to the injected wallet to be confirmed by the user.
            let tx = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: userAddress,
                        to: CONTRACT_ADDRESS,
                        data: calldata, // Information about which function to call and what values to pass as parameters
                    },
                ],
            });
        }
    }

    return <button onClick={callMint}>Call Mint</button>;
}
