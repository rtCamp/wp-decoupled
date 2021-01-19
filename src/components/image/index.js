import Image from 'next/image'
import { defaultImg } from './defaultImg';

const NextImage = (props) => {

    const { 
        className,
        src,
        srcSet,
        alt,
        width,
        height,
        sizes
    } = props;
    const imgSrc = typeof src === 'string' ? src || defaultImg : defaultImg;

    return (
        <Image 
            className={className}
            src={imgSrc}
            srcSet={srcSet}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes} 
        />
    );
}

export default NextImage;