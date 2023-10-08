import PayTokenFunctionCall from "./dApps/PayTokenFunctionCall";
import TransferCUSD from "./dApps/TransferCUSD";

export default function App() {
    return (
        <div
            style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
            }}
        >
            <TransferCUSD />
            <PayTokenFunctionCall />
        </div>
    );
}
