import "../../styles/globals.css";
import styles from "./pokedex.module.css";

export default function Loading() {
    return (
        <div className={styles.loading}>
            <div className={styles.border}></div>
            <div className={styles.loadingText}>Loading...</div>
        </div>
    );
}
