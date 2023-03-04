"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import PokedexCard from "../../common/components/PokedexCard/PokedexCard";

import searchIcon from "../../assets/images/search.svg";

import "../../styles/globals.css";
import styles from "./pokedex.module.css";

async function getAllPokemon(offset: number) {
    const res = await fetch("/api/pokeapi/", {
        method: "POST",
        body: JSON.stringify({
            query: `
                query getAllPokemonQuery($offset: Int = 0) {
                    pokemon_v2_pokemon(order_by: {pokemon_species_id: asc}, distinct_on: pokemon_species_id, limit: 50, offset: $offset) {
                        pokemon_species_id
                        name
                        height
                        weight
                        pokemon_v2_pokemontypes {
                            pokemon_v2_type {
                                id
                                name
                            }
                        }
                        pokemon_v2_pokemonsprites {
                            sprites
                        }
                    }
                    pokemon_v2_pokemon_aggregate {
                        aggregate {
                            count(columns: pokemon_species_id, distinct: true)
                        }
                    }
                }
            `,
            variables: {
                offset: offset,
            },
        }),
    });
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data;
}

export default function Page() {
    const [pokemon, setPokemon] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPokemon, setTotalPokemon] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const offset = 50 * (currentPage - 1);
        (async () => {
            const response = await getAllPokemon(offset);
            setPokemon(response.data?.pokemon_v2_pokemon);
            setTotalPokemon(
                response.data?.pokemon_v2_pokemon_aggregate.aggregate.count
            );
            setLoading(false);
        })();
    }, [currentPage]);

    useEffect(() => {
        setTotalPages(Math.ceil(totalPokemon / 50));
    }, [totalPokemon]);

    const afterPageClicked = (e: { selected: number }) => {
        setCurrentPage(e.selected + 1);
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchbar}>
                <Image
                    src={searchIcon}
                    className={styles.searchIcon}
                    alt="search"
                />
                <input
                    className={styles.searchPlaceholder}
                    placeholder="Search"
                />
            </div>
            {loading || pokemon.length < 1 ? (
                <div className={styles.loading}>Loading...</div>
            ) : (
                <div className={styles.pokemonList}>
                    {pokemon?.map(
                        (
                            item: {
                                pokemon_species_id: number;
                                name: string;
                                height: number;
                                weight: number;
                                pokemon_v2_pokemontypes: {};
                                pokemon_v2_pokemonsprites: [
                                    { sprites: string }
                                ];
                            },
                            index: number
                        ) => {
                            return (
                                <PokedexCard
                                    className={styles.card}
                                    key={index}
                                    id={item.pokemon_species_id}
                                    name={item.name}
                                    sprites={JSON.parse(
                                        item.pokemon_v2_pokemonsprites[0]
                                            .sprites
                                    )}
                                />
                            );
                        }
                    )}
                </div>
            )}
            <div>
                <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    breakLabel="..."
                    initialPage={currentPage - 1}
                    pageCount={totalPages}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={afterPageClicked}
                    containerClassName={`${styles.paginationContainer} ${
                        loading || pokemon.length < 1 ? styles.hide : ""
                    }`}
                    previousClassName={styles.paginationPrevious}
                    previousLinkClassName={styles.paginationPreviousLink}
                    nextClassName={styles.paginationNext}
                    nextLinkClassName={styles.paginationNextLink}
                    breakClassName={styles.paginationBreak}
                    breakLinkClassName={styles.paginationBreakLink}
                    pageClassName={styles.paginationPage}
                    pageLinkClassName={styles.paginationPageLink}
                />
            </div>
        </div>
    );
}
