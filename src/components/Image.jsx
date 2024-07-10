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
        <img
            src={src}
            alt={alt}
            className={`w-full h-auto object-cover`}
            onLoad={handleImageLoad}
        />
    );
};

export default Image;
