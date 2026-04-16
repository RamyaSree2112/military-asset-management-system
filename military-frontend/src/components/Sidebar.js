import { Link } from "react-router-dom";
import "../styles/layout.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Military</h2>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/purchase">Purchase</Link>
      <Link to="/transfer">Transfer</Link>
    </div>
  );
}

export default Sidebar;