import styles from "./AppBar.module.css";
import Navigation from "../Navigation/Navigation";

export default function AppBar() {
  return (
    <div className={styles.AppBar}>
      <Navigation />
    </div>
  );
}
