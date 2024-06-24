import { useState, useEffect } from 'react';

/* 
Component responsible for fetching and preparing relevant image for rendering.

*/

const Image = ({ src, alt, id, onLoaded }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!src) return;
        const img = new Image();
        img.src = src;
        img.onLoad = () => {
            setLoading(false);
            onLoaded();
        };
    }, [src]);

    /* TODO handle API fetch of image and prep work here to serve to app */
    /* For now just serve local image */
    return (
        <div className='relative'>
            {loading && (
                <div className='absolute inset-0 flex items-center justify-center'>
                    Loading...
                </div>
            )}

            <img
                src={src}
                alt={alt}
                className={`w-full h-auto object-cover ${
                    loading ? 'hidden' : ''
                }`}
                style={{
                    maxHeight: '1024px',
                    maxWidth: '1024px',
                }} /* limiter for sizing, 70vh for testing and adjusting. */
            />
        </div>
    );
};

export default Image;
