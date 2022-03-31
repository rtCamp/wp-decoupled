import { useState } from 'react';
import Img from 'next/image';
import PropTypes from 'prop-types';

const Image = (props) => {
    const [error, setError] = useState(false);

    const { src, width, height, alt, ...otherProps } = props;

    // URL to use if the actual image fails to load.
    const fallBackUrl = '/static/placeholder.png';

    /**
     * Handles any error when loading the image.
     *
     * @return {void}
     */
    const errorHandler = () => {
        setError(true);
    };

    const imageSrc = (error ? false : src) || fallBackUrl;

    return (
        <Img
            src={imageSrc}
            width={width}
            height={height}
            onError={errorHandler}
            alt={alt}
            {...otherProps}
        />
    );
};

Image.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    alt: PropTypes.string,
    layout: PropTypes.oneOf(['fixed', 'intrinsic', 'responsive', 'fill']),
    sizes: PropTypes.string,
    quality: PropTypes.number,
    priority: PropTypes.bool,
    objectFit: PropTypes.string,
    objectPosition: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string
};

Image.defaultProps = {
    width: 240,
    height: 240
};

export default Image;
