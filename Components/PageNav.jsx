import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <Logo />
        <li>
          <NavLink to="/Pricing">Prices</NavLink>
        </li>
        <li>
          <NavLink to="/Product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}
