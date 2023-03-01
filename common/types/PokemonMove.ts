export type PokemonMove = {
    level: number;
    pokemon_v2_move: {
        accuracy: number;
        power: number;
        pp: number;
        priority: number;
        pokemon_v2_movenames: [{ name: string }];
        pokemon_v2_type: {
            pokemon_v2_typenames: [{ name: string }];
        };
        pokemon_v2_movedamageclass: {
            pokemon_v2_movedamageclassnames: [{ name: string }];
        };
        pokemon_v2_moveflavortexts: [{ flavor_text: string }];
    };
};
