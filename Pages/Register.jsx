import { useNavigate } from "react-router-dom";
import PageNav from "../Components/Pagenav";
import styles from "./Register.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/FakeAuthContext";

export default function Register() {
  const [name, setName] = useState("Jack");
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const [confirmPassword, setConfirmPassword] = useState("qwerty");

  const { Register, isAuthenticated } = useAuth(); 
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      if (!name || !email || !password || !confirmPassword)
        throw new Error("A field is empty");

      if (password !== confirmPassword)
        throw new Error("Passwords do not match");

      await Register(name, email, password);
      navigate("/login");

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app/cities", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.register}>
      <PageNav />

      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="name">Full name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>

        <div>
          <button onClick={handleRegister}>Register</button>
        </div>
      </form>
    </main>
  );
}
