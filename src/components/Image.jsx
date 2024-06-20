/* 
Component responsible for fetching and preparing relevant image for rendering.

*/

const Image = ({ src, alt, id }) => {
    /* TODO handle API fetch of image and prep work here to serve to app */
    /* For now just serve local image */
    return (
        <img
            id={id}
            src={src}
            alt={alt}
            className='w-full h-auto object-cover'
            style={{
                maxHeight: '1024px',
                maxWidth: '1024px',
            }} /* limiter for sizing, 70vh for testing and adjusting. */
        />
    );
};

export default Image;
