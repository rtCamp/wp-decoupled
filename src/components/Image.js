import { useState } from 'react';
import Img from 'next/image';

const Image = (props) => {

    const [error, setError] = useState(false);
    
    const {
        src,
        width = 240,
        height = 240,
        alt = '',
        ...otherProps
    } = props;
    
    // URL to use if the actual image fails to load.
    const fallBackUrl = `https://via.placeholder.com/${width}x${height}?text=${alt}`;

    /**
     * Handles any error when loading the image.
     * 
     * @return {void}
     */
    const errorHandler = () => {
        setError(true);
    }

    return (
        <>
            <Img 
            src={error ? fallBackUrl : src}
            width={width}
            height={height} 
            onError={errorHandler}
            alt={alt} 
            {...otherProps}/>
        </>
    );
};

export default Image;
