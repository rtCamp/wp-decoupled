import { useState } from "react";
import Image from '../Image';

const Gallery = ({edges}) => {

    const [active, setActive] = useState(0);

    const lastImage = edges.length - 1;

    const prevIndex = active - 1 < 0 ? lastImage : active - 1;
    const nextIndex = active + 1 > lastImage ? 0 : active + 1;

    let galleryContent;

    edges.length ? edges.map( ({ node }, i ) => {
        let className = '';
        if ( active === i ) {
            className = 'active';
            galleryContent = 
            <div className={`ImageAnimation ${className}`} key={edges[active]?.node?.id} >
                    <Image
                        src={node?.sourceUrl}
                        alt={node?.altText || node?.name}
                        width={400}
                        height={400}
                    />
            </div>
        }
    }) : null;

    return (
        <>
            {
                edges.length > 0 && 
                    <div className="product-gallery">
                        <span className="arrowIcon nextImage fas fa-chevron-right" onClick={() => setActive(prevIndex)}></span>
                            { galleryContent }
                        <span className="arrowIcon prevImage fas fa-chevron-left"  onClick={() => setActive(nextIndex)}></span>
                    </div>
            }
        </>
    )
}
export default Gallery