import { useNavigate } from "react-router-dom";
import PageNav from "../Components/Pagenav";
import { useAuth } from "../Contexts/FakeAuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { Login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    try {
      if (!email || !password) throw new Error("Email or password is empty");
      await Login(email, password);
      navigate("/app/cities");
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
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
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

        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </form>
    </main>
  );
}
