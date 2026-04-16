import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/form.css";

function Purchase() {
  const [assetName, setAssetName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [base, setBase] = useState("");

  const addPurchase = async () => {
    const token = localStorage.getItem("token");

    await fetch("https://military-backend-mhuh.onrender.com/api/purchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify({ assetName, quantity, base })
    });

    alert("Added");
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="form-container">
          <div className="form-box">
            <h2>Purchase</h2>

            <input placeholder="Asset" onChange={(e)=>setAssetName(e.target.value)} />
            <input placeholder="Quantity" onChange={(e)=>setQuantity(e.target.value)} />
            <input placeholder="Base" onChange={(e)=>setBase(e.target.value)} />

            <button onClick={addPurchase}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Purchase;