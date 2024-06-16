import PayTokenFunctionCall from "./dApps/PayTokenFunctionCall";
import TransferCUSD from "./dApps/TransferCUSD";

export default function App() {
    return (
        <div
            style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                backgroundColor: "lightgray",
                padding: "20px",
                borderRadius: "80px",
            }}
        >
            <TransferCUSD />
        </div>
    );
}
