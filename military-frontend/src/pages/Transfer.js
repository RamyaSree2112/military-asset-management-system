import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/form.css";

function Transfer() {
  const [assetName, setAssetName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [fromBase, setFromBase] = useState("");
  const [toBase, setToBase] = useState("");

  const transfer = async () => {
    const token = localStorage.getItem("token");

    await fetch("https://military-backend-mhuh.onrender.com/api/transfers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify({ assetName, quantity, fromBase, toBase })
    });

    alert("Transferred");
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="form-container">
          <div className="form-box">
            <h2>Transfer</h2>

            <input placeholder="Asset" onChange={(e)=>setAssetName(e.target.value)} />
            <input placeholder="Quantity" onChange={(e)=>setQuantity(e.target.value)} />
            <input placeholder="From Base" onChange={(e)=>setFromBase(e.target.value)} />
            <input placeholder="To Base" onChange={(e)=>setToBase(e.target.value)} />

            <button onClick={transfer}>Transfer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transfer;