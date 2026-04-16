import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [transfers, setTransfers] = useState([]);

  const [active, setActive] = useState("assets");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAssets = async () => {
      const res = await fetch("https://military-backend-mhuh.onrender.com/api/assets", {
        headers: { authorization: token }
      });
      const data = await res.json();
      setAssets(data);
    };

    const fetchPurchases = async () => {
      const res = await fetch("https://military-backend-mhuh.onrender.com/api/purchases", {
        headers: { authorization: token }
      });
      const data = await res.json();
      setPurchases(data);
    };

    const fetchTransfers = async () => {
      const res = await fetch("https://military-backend-mhuh.onrender.com/api/transfers", {
        headers: { authorization: token }
      });
      const data = await res.json();
      setTransfers(data);
    };

    fetchAssets();
    fetchPurchases();
    fetchTransfers();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="dashboard">
          <h2>Dashboard</h2>

          {/* 🔥 TABS */}
          <div className="cards">
            <div
              className={active === "assets" ? "card active" : "card"}
              onClick={() => setActive("assets")}
            >
              Assets
            </div>

            <div
              className={active === "transfers" ? "card active" : "card"}
              onClick={() => setActive("transfers")}
            >
              Transfers
            </div>

            <div
              className={active === "purchases" ? "card active" : "card"}
              onClick={() => setActive("purchases")}
            >
              Purchases
            </div>
          </div>

          {/* 🔥 DISPLAY DATA */}

          {/* ✅ ASSETS */}
          {active === "assets" && (
            <>
              <h3>Assets</h3>

              {assets.length === 0 ? (
                <p>No assets found</p>
              ) : (
                assets.map((a, i) => (
                  <div key={i} className="asset-item">
                    {a.assetName} - {a.quantity} - {a.base}
                  </div>
                ))
              )}
            </>
          )}

          {/* ✅ PURCHASES */}
          {active === "purchases" && (
            <>
              <h3>Purchases</h3>

              {purchases.length === 0 ? (
                <p>No purchases found</p>
              ) : (
                purchases.map((p, i) => (
                  <div key={i} className="asset-item">
                    {p.assetName} - {p.quantity} - {p.base}
                  </div>
                ))
              )}
            </>
          )}

          {/* ✅ TRANSFERS */}
          {active === "transfers" && (
            <>
              <h3>Transfers</h3>

              {transfers.length === 0 ? (
                <p>No transfers found</p>
              ) : (
                transfers.map((t, i) => (
                  <div key={i} className="asset-item">
                    {t.assetName} - {t.quantity} ({t.fromBase} → {t.toBase})
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;