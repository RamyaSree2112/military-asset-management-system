import "../styles/layout.css";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <h3>Military Asset System</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;