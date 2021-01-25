import Link from 'next/link';
import AddToCartButton from '../cart/AddToCartButton';

const Products = ({ products }) => {
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-5">Products</h2>
            {products.length ? (
                <div className="mt-2">
                    <div className="products-wrapper row">
                        {products.map((item) =>
                            // @TODO Need to add support for Group product.
                            undefined !== item && 'GroupProduct' !== item.__typename ? (
                                <div className="product-container col-md-3 mb-5" key={item.id}>
                                    {/* @TODO need to get rid of using databseId here. */}
                                    <Link href={`/product/${item.slug}`}>
                                        <a>
                                            <span className="product-link">
                                                <img
                                                    className="product-image"
                                                    src={item.image.sourceUrl}
                                                    srcSet={item.image.srcSet}
                                                    alt={item.name}
                                                />
                                                <h5 className="product-name">{item.name}</h5>
                                                <p className="product-price">{item.price}</p>
                                            </span>
                                        </a>
                                    </Link>
                                    <AddToCartButton product={item} />
                                </div>
                            ) : (
                                ''
                            )
                        )}
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default Products;