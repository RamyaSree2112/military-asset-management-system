import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async () => {
    // basic validation
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://military-backend-mhuh.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);

        // optional: store role (useful later)
        if (data.role) {
          localStorage.setItem("role", data.role);
        }

        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={login} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          style={{ marginTop: "10px", cursor: "pointer", color: "blue" }}
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
}

export default Login;