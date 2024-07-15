import { useEffect, useState } from 'react';
import Image from './components/Image';
import HexGrid from './components/HexGrid';
import { checkHit } from '../api';
import Status from './components/Status';
import Timer from './components/Timer';

/* Eureka to investigate

instead of hex grid, use viewport coordinates standardised. Much less headache?
*/

function App() {
    // State handling clicked coordinates
    const [hitCharacters, setHitCharacters] = useState([]);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [finalTime, setFinalTime] = useState(null);
    const [startTimer, setStartTimer] = useState(false);
    const [clickCoordinates, setClickCoordinates] = useState([]);

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

    const handleImageClick = async (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setClickCoordinates([...clickCoordinates, { x, y }]);
        // mock API call to check if click was a hit
        const response = await checkHit(Math.round(x), Math.round(y));

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
                    onClick={handleImageClick}
                >
                    <Image
                        src='/wherestheparty.png'
                        alt='Game image'
                        className='max-w-full max-h-full'
                        onLoad={handleImageLoad}
                    />
                    {clickCoordinates.map((coord, index) => (
                        <div
                            key={index}
                            className='absolute rounded-full border-4 border-red-600'
                            style={{
                                width: '40px',
                                height: '40px',
                                left: `${coord.x - 20}px`,
                                top: `${coord.y - 20}px`,
                            }}
                        ></div>
                    ))}
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
