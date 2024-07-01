import { useState, useEffect } from 'react';

const Timer = ({ start, onStop }) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let timer;

        if (start) {
            timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(timer);
            onStop(seconds); // Notify App component with final time
        }

        return () => clearInterval(timer);
    }, [start, onStop]);

    return (
        <div>
            <h1>Timer: {seconds} seconds</h1>
        </div>
    );
};

export default Timer;
