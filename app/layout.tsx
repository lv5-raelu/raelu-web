import Link from "next/link";

import styles from "./layout.module.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <title>Next.js</title>
            </head>
            <body>
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
