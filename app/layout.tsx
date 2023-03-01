import Link from "next/link";

import { Poppins } from "@next/font/google";
import styles from "./layout.module.css";

const poppins = Poppins({
    weight: ["400", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <title>raelu</title>
            </head>
            <body className={poppins.className}>
                <div className={styles.header}>
                    <div>
                        <Link href="/">Home</Link>
                    </div>
                    <div>
                        <Link href="/pokedex">Pokédex</Link>
                    </div>
                </div>
                <div className={styles.children}>{children}</div>
            </body>
        </html>
    );
}
