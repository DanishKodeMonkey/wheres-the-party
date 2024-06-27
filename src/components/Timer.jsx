import { useEffect, useState } from 'react';

const Timer = ({ start }) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <h1>Timer: {seconds} seconds</h1>
        </div>
    );
};

export default Timer;
