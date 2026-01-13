import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
export default function AppNav() {
  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
      </ul>
    </div>
  );
}
