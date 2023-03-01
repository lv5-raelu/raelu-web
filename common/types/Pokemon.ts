import type { PokemonType } from "./PokemonType";
import type { PokemonAbility } from "./PokemonAbility";
import type { PokemonFlavorText } from "./PokemonFlavorText";
import type { PokemonStat } from "./PokemonStat";
import type { PokemonMove } from "./PokemonMove";
import type { PokemonSprite } from "./PokemonSprite";

export type Pokemon = {
    pokemonSpeciesId: number;
    name: string;
    height: number;
    weight: number;
    pokemon_v2_pokemontypes: PokemonType[];
    pokemon_v2_pokemonspecy: PokemonFlavorText;
    pokemon_v2_pokemonabilities: PokemonAbility[];
    pokemon_v2_pokemonstats: PokemonStat[];
    pokemon_v2_pokemonmoves: PokemonMove[];
    pokemon_v2_pokemonsprites: PokemonSprite[];
};
