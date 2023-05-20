import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import todoLogo from "../../assets/Logo.png";

export function Navbar() {
  return (
    <header className={styles.header}>
      <img src={todoLogo} alt="" />
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/">Confessions</Link>
          </li>
          <li>
            <Link to="/add">Add</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
