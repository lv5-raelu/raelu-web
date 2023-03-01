"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./PokedexCard.module.css";

export default function PokedexCard(props: any) {
    return (
        <Link href={`/pokedex/${props.id}`} className={props.className}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>#{props.id}</div>
                <Image
                    src={props.sprites["other"]["official-artwork"][
                        "front_default"
                    ].replace(
                        "/media",
                        "https://raw.githubusercontent.com/PokeAPI/sprites/master"
                    )}
                    width={72}
                    height={72}
                    className={styles.cardImage}
                    alt="sprite"
                    priority={true}
                />
                <div className={styles.cardFooter}>
                    {props.name.charAt(0).toUpperCase() +
                        props.name.substring(1)}
                </div>
            </div>
        </Link>
    );
}
