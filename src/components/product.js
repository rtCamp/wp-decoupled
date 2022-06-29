import Link from 'next/link';
import Image from './Image';
import AddToCartButton from './cart/AddToCartButton';
import PropTypes from 'prop-types';

const Product = ({ item }) => {
    return (
        <div className="product-container col-md-3 mb-5">
            {/* @TODO need to get rid of using databseId here. */}
            <Link href={`/product/${item.slug}`}>
                <a>
                    <span className="product-link">
                        <Image
                            src={item?.image?.sourceUrl}
                            alt={item?.image?.altText || item?.name}
                        />
                        <h5 className="product-name">{item.name}</h5>
                        <p className="product-price">{item.price}</p>
                    </span>
                </a>
            </Link>
            <AddToCartButton product={item} />
        </div>
    );
};

export default Product;
