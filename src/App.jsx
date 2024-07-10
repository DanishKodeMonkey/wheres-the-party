import { useEffect, useState } from 'react';
import Image from './components/Image';
import HexGrid from './components/HexGrid';
import { checkHit } from '../api';
import Status from './components/Status';
import Timer from './components/Timer';

function App() {
    // State handling clicked coordinates
    const [hitCharacters, setHitCharacters] = useState([]);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [finalTime, setFinalTime] = useState(null);
    const [startTimer, setStartTimer] = useState(false);

    const handleImageLoad = () => {
        setIsImageLoaded(true); // render timer
        setStartTimer(true); // start timer
        console.log('Image loaded');
    };

    useEffect(() => {
        if (hitCharacters.length === 3) {
            setStartTimer(false);
        }
    }, [hitCharacters]);
    const handleCellClick = async (row, col) => {
        console.log('clicked: ', row, col);
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

    const handleGameWin = (time) => {
        setFinalTime(time);
        setGameWon(true);

        console.log(gameWon, finalTime);
    };

    return (
        <div className='App p-4 text-center'>
            <h1 className='text-2xl font-bold mb-4'>Where's the party?!</h1>
            {isImageLoaded && !gameWon && (
                <Timer
                    start={startTimer}
                    onStop={handleGameWin}
                />
            )}
            <div className='flex'>
                <div className='w-1/4 pr-4'>
                    <Status hitCharacters={hitCharacters} />
                </div>

                <div
                    id='image-container'
                    className='relative w-2/6'
                >
                    <Image
                        src='/wherestheparty.png'
                        alt='Game image'
                        className='max-w-full max-h-full'
                        onLoad={handleImageLoad}
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
            {gameWon && (
                <div className='absolute inset-0 flex items-center justify-center z-10'>
                    <p className='text-9xl text-white bg-slate-500 bg-opacity-75 p-8'>
                        YOU WIN! <hr />
                        Time: {finalTime} seconds
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;
