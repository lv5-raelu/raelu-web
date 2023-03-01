export type PokemonAbility = {
    pokemon_v2_ability: {
        pokemon_v2_abilitynames: [
            {
                name: string;
            }
        ];
        pokemon_v2_abilityflavortexts: [
            {
                flavor_text: string;
            }
        ];
    };
    is_hidden: boolean;
};
