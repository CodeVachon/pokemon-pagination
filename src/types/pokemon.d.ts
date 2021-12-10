export interface IPokemonRecord {
    id: string;
    name: string;
    height: number;
    weight: number;
    stats: {
        name: string;
        base_stat: number;
    }[];
    species: {
        habitat: {
            name: string;
        };
        color: {
            name: string;
        };
    };
    sprites: {
        official_artwork_front_default: string;
    };
    types: {
        name: string;
    }[];
    abilities: {
        name: string;
        is_hidden: boolean;
    }[];
}
