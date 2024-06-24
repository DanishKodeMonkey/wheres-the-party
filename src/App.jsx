import { useEffect, useState } from 'react';
import Image from './components/Image';
import HexGrid from './components/HexGrid';
import { checkHit } from '../api';

function App() {
    // State handling clicked coordinates
    const [hitCharacters, setHitCharacters] = useState([]);

    const handleCellClick = async (row, col) => {
        // mock API call to check if click was a hit
        const response = await checkHit(row, col);

        // if so, place hit character in front end state, pass this state to hexgrid for styling
        if (response.hit) {
            setHitCharacters((prevHitCharacters) => [
                ...prevHitCharacters,
                response.character,
            ]);
        }
    };

    return (
        <div className='App p-4'>
            <h1 className='text-2xl font-bold mb-4'>Where's the party?!</h1>
            <div
                id='image-container'
                className='relative'
            >
                <Image
                    src='/wherestheparty.png'
                    alt='Game image'
                    className='max-w-full max-h-full'
                />
                <HexGrid
                    imageWidth={1024}
                    imageHeight={1024}
                    numRows={50}
                    numCols={50}
                    onCellClick={handleCellClick}
                    hitCharacters={hitCharacters}
                />
            </div>
        </div>
    );
}

export default App;
