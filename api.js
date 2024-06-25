import { characters as initialCharacters } from './mockDatabase';

// Function to check if a clicked cell is a hit

export const checkHit = async (row, col) => {
    //simulate a delay for API call
    await new Promise((resolve) => setTimeout(resolve, 100));

    const hitCharacter = initialCharacters.find((character) =>
        character.coordinates.some(
            (coord) => coord.row === row && coord.col === col
        )
    );
    if (hitCharacter) {
        return { hit: true, character: hitCharacter };
    } else {
        return { hit: false };
    }
};

export const fetchCharacterDetails = async () => {
    // simulate delay of API call

    await new Promise((resolve) => setTimeout(resolve, 100));

    // extract character names and image paths
    const characterDetails = initialCharacters.map(({ name, avatar }) => ({
        name,
        avatar,
    }));
    return characterDetails;
};
