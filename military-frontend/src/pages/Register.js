import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Logistics");

  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log({ name, email, password, role }); // 👈 DEBUG

    const res = await fetch("https://military-backend-mhuh.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await res.json();

    if (data.message) {
      alert("Registered");
      navigate("/");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

      {/* 🔥 IMPORTANT FIX */}
      <select value={role} onChange={(e)=>setRole(e.target.value)}>
        <option value="Admin">Admin</option>
        <option value="Commander">Commander</option>
        <option value="Logistics">Logistics</option>
      </select>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;