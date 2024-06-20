import { useEffect, useState } from 'react';
import Image from './components/Image';
import HexGrid from './components/HexGrid';

function App() {
    // State handling clicked coordinates
    const [clickedCoords, setClickedCoords] = useState([]); // array of clicked coords [row,col]

    useEffect(() => {
        // log to console when new coordinates are stored

        console.log(clickedCoords);
        // TODO: Send data to API for validation (TODO)
        // E.g sendClickToAPI(clickedCoords)
    }, [clickedCoords]);

    const handleCellClick = ({ row, col }) => {
        // update clicked coordinates state
        setClickedCoords((prevClickedCoords) => [
            ...clickedCoords,
            { row, col },
        ]);
    };

    return (
        <div className='App p-4'>
            <h1 className='text-2xl font-bold mb-4'>Where's the party?!</h1>
            <div
                id='image-container'
                className='relative'
            >
                <Image
                    id='game-image'
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
                />
            </div>
        </div>
    );
}

export default App;
