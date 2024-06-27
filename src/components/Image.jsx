import { useState } from 'react';

/* 
Component responsible for fetching and preparing relevant image for rendering.

*/

const Image = ({ src, alt, onLoad }) => {
    const handleImageLoad = () => {
        onLoad();
    };
    /* TODO handle API fetch of image and prep work here to serve to app */
    /* For now just serve local image */

    return (
        <div className='relative'>
            <img
                src={src}
                alt={alt}
                className={`w-full h-auto object-cover`}
                onLoad={handleImageLoad}
                style={{
                    maxHeight: '1024px',
                    maxWidth: '1024px',
                }} /* limiter for sizing, 70vh for testing and adjusting. */
            />
        </div>
    );
};

export default Image;
