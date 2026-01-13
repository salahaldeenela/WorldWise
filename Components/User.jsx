import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/FakeAuthContext";
import styles from "./User.module.css";

function User() {
  const { Logout } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    try {
      Logout();
      navigate("/");
    } catch (E) {
      console.log("e:");
    }
  }

  return user ? (
    <div className={styles.user}>
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  ) : null;
}

export default User;
