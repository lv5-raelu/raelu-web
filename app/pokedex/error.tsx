"use client";

import "../../styles/globals.css";
import { useEffect } from "react";
import styles from "./pokedex.module.css";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className={styles.error}>
            <div>ERROR</div>
            <p>Something went wrong!</p>
            <button onClick={() => reset()}>Reset error boundary</button>
        </div>
    );
}
