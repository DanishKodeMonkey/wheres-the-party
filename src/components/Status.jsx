import { useEffect, useState } from 'react';
import { fetchCharacterDetails } from '../../api';

const Status = () => {
    const [characterDetails, setCharacterDetails] = useState([]);

    useEffect(() => {
        const getCharacters = async () => {
            const data = await fetchCharacterDetails();
            setCharacterDetails(data);
        };
        getCharacters();
    }, []);

    return (
        <div className='p-4 bg-gray-100 rounded-lg shadow-md h-full'>
            <h2 className='text-4xl font-bold mb-2 text-center underline'>
                Wanted poster, find them!
            </h2>
            <ul className='list-disc pl-5'>
                {characterDetails.map((character, index) => (
                    <li
                        key={index}
                        className='mb-4 flex flex-col items-center'
                    >
                        <img
                            src={character.avatar}
                            alt={character.name}
                            className='w-1/3 h-1/3 rounded-full mr-4'
                        />
                        <div>
                            <span className='text-3xl font-semibold'>
                                {character.name}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Status;
