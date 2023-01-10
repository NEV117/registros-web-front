import { useState } from "react";
import { useSingUp } from "../hooks/useSingUp";
const Singup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSingUp();

  const handelSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handelSubmit}>
      <h3 className=" text-center">
        <strong>Registar nuevo usuario</strong>
      </h3>

      <label>Email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Contraseña</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <center>
        <button disabled={isLoading}>registrar</button>
      </center>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Singup;
