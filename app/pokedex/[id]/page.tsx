"use client";

import { useEffect, useState } from "react";

import styles from "./page.module.css";
import "../../../styles/globals.css";

import type { Pokemon } from "@/common/types/Pokemon";

async function getPokemonById(pokemonSpeciesId: number, generationId: number) {
    const res = await fetch("/api/pokeapi/", {
        method: "POST",
        body: JSON.stringify({
            query: `
                query getPokemonByIdQuery($generation_id: Int = 1, $pokemon_species_id: Int = 0) {
                    pokemon_v2_pokemon(where: {pokemon_species_id: {_eq: $pokemon_species_id}, pokemon_v2_pokemonforms: {pokemon_v2_pokemonformgenerations: {generation_id: {_eq: $generation_id}}}}) {
                        pokemon_species_id
                        name
                        height
                        weight
                        pokemon_v2_pokemonforms(where: {pokemon_v2_pokemonformgenerations: {generation_id: {_eq: $generation_id}}}) {
                            form_name
                            pokemon_v2_pokemonformnames(where: {language_id: {_eq: 9}}) {
                                name
                                pokemon_name
                            }
                        }
                        pokemon_v2_pokemontypes {
                            pokemon_v2_type {
                                pokemon_v2_typenames(where: {language_id: {_eq: 9}}) {
                                    name
                                }
                            }
                        }
                        pokemon_v2_pokemonspecy {
                            pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 9}, pokemon_v2_version: {pokemon_v2_versiongroup: {generation_id: {_eq: $generation_id}}}}, distinct_on: flavor_text) {
                                flavor_text
                            }
                        }
                        pokemon_v2_pokemonabilities {
                            pokemon_v2_ability {
                                pokemon_v2_abilitynames(where: {language_id: {_eq: 9}}) {
                                    name
                                }
                                pokemon_v2_abilityflavortexts(where: {language_id: {_eq: 9}, pokemon_v2_versiongroup: {generation_id: {_eq: $generation_id}}}, distinct_on: flavor_text) {
                                    flavor_text
                                }
                            }
                            is_hidden
                        }
                        pokemon_v2_pokemonstats(where: {pokemon_v2_stat: {}}) {
                            base_stat
                            pokemon_v2_stat {
                                pokemon_v2_statnames(where: {language_id: {_eq: 9}}) {
                                    name
                                }
                            }
                        }
                        pokemon_v2_pokemonmoves(where: {pokemon_v2_versiongroup: {generation_id: {_eq: $generation_id}}}) {
                            level
                            pokemon_v2_move {
                                accuracy
                                power
                                pp
                                priority
                                pokemon_v2_movenames(where: {language_id: {_eq: 9}}) {
                                    name
                                }
                                pokemon_v2_type {
                                    pokemon_v2_typenames(where: {language_id: {_eq: 9}}) {
                                        name
                                    }
                                }
                                pokemon_v2_movedamageclass {
                                    pokemon_v2_movedamageclassnames(where: {language_id: {_eq: 9}}) {
                                        name
                                    }
                                }
                                pokemon_v2_moveflavortexts(where: {language_id: {_eq: 9}, pokemon_v2_versiongroup: {generation_id: {_eq: $generation_id}}}, distinct_on: flavor_text) {
                                    flavor_text
                                }
                            }
                        }
                        pokemon_v2_pokemonsprites {
                            sprites
                        }
                    }
                }
            `,
            variables: {
                pokemon_species_id: pokemonSpeciesId,
                generation_id: generationId,
            },
        }),
    });
    const data = await res.json();

    return data.data?.pokemon_v2_pokemon;
}

export default function Page({ params }: { params: { id: number } }) {
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [types, setTypes] = useState<any>([]);
    const [flavorTexts, setFlavorTexts] = useState<any>([]);
    const [abilities, setAbilities] = useState<any>([]);
    const [stats, setStats] = useState<any>([]);
    const [moves, setMoves] = useState<any>([]);
    const [sprite, setSprite] = useState<any>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        (async () => {
            const response = await getPokemonById(params.id, 7);
            setPokemonData(response);
            setLoading(false);
        })();
    }, [params.id]);

    useEffect(() => {
        if (pokemonData.length > 0) {
            const typesData = pokemonData[0].pokemon_v2_pokemontypes.map(
                (pokemonType) => {
                    return pokemonType.pokemon_v2_type.pokemon_v2_typenames[0]
                        .name;
                }
            );
            setTypes(typesData);

            const flavorTextsData =
                pokemonData[0].pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts.map(
                    (flavorText) => {
                        return flavorText.flavor_text;
                    }
                );
            setFlavorTexts(flavorTextsData);

            const abilitiesData =
                pokemonData[0].pokemon_v2_pokemonabilities.map(
                    (pokemonAbilities) => {
                        const names =
                            pokemonAbilities.pokemon_v2_ability.pokemon_v2_abilitynames.map(
                                (abilityName) => {
                                    return abilityName.name;
                                }
                            );
                        const flavorTexts =
                            pokemonAbilities.pokemon_v2_ability.pokemon_v2_abilityflavortexts.map(
                                (abilityFlavorText) => {
                                    return abilityFlavorText.flavor_text;
                                }
                            );
                        const isHidden = pokemonAbilities.is_hidden;
                        let name, flavorText;
                        if (names.length > 0) name = names[0];
                        if (flavorTexts.length > 0) flavorText = flavorTexts[0];
                        return { name, flavorText, isHidden };
                    }
                );
            setAbilities(abilitiesData);

            const statsData = pokemonData[0].pokemon_v2_pokemonstats.map(
                (pokemonStat) => {
                    return {
                        baseStat: pokemonStat.base_stat,
                        name: pokemonStat.pokemon_v2_stat
                            .pokemon_v2_statnames[0].name,
                    };
                }
            );
            setStats(statsData);

            const movesData = pokemonData[0].pokemon_v2_pokemonmoves.map(
                (pokemonMove) => {
                    return {
                        level: pokemonMove.level,
                        accuracy: pokemonMove.pokemon_v2_move.accuracy,
                        power: pokemonMove.pokemon_v2_move.power,
                        pp: pokemonMove.pokemon_v2_move.pp,
                        priority: pokemonMove.pokemon_v2_move.priority,
                        name: pokemonMove.pokemon_v2_move
                            .pokemon_v2_movenames[0].name,
                        type: pokemonMove.pokemon_v2_move.pokemon_v2_type
                            .pokemon_v2_typenames[0].name,
                        damageClass:
                            pokemonMove.pokemon_v2_move
                                .pokemon_v2_movedamageclass
                                .pokemon_v2_movedamageclassnames[0].name,
                        flavorText:
                            pokemonMove.pokemon_v2_move
                                .pokemon_v2_moveflavortexts[0].flavor_text,
                    };
                }
            );
            setMoves(movesData);

            const spritesData = JSON.parse(
                pokemonData[0].pokemon_v2_pokemonsprites[0].sprites
            );
            setSprite(
                spritesData["other"]["official-artwork"][
                    "front_default"
                ].replace(
                    "/media",
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master"
                )
            );
        }
    }, [pokemonData]);

    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loading}>Loading...</div>
            ) : (
                <div>
                    <div className={styles.pokemonName}>
                        {pokemonData[0]?.name}
                    </div>
                    <div className={styles.abilityContainer}>
                        {abilities.map(
                            (
                                ability: {
                                    name: string;
                                    flavorText: string;
                                    isHidden: boolean;
                                },
                                index: number
                            ) => {
                                return (
                                    <div key={index} className={styles.ability}>
                                        <div className={styles.abilityName}>
                                            {ability.name}
                                        </div>
                                        <div
                                            className={styles.abilityFlavorText}
                                        >
                                            {ability.flavorText}
                                        </div>
                                        <div
                                            className={
                                                styles.hiddenAbilityDescription
                                            }
                                        >
                                            {ability.isHidden
                                                ? "Hidden Ability"
                                                : ""}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                    <div>{JSON.stringify(types)}</div>
                    <div>{JSON.stringify(flavorTexts)}</div>
                    <div>{JSON.stringify(stats)}</div>
                    <div>{JSON.stringify(moves[0])}</div>
                    <div>{JSON.stringify(sprite)}</div>
                </div>
            )}
        </div>
    );
}
