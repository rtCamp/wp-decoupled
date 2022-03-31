import Product from '../components/product';
import Pagination from './pagination';

const Products = ({ products, paginationInfo = false }) => {
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-5">Products</h2>
            {paginationInfo && <Pagination paginationInfo={paginationInfo} />}
            {products.length ? (
                <div className="mt-2">
                    <div className="products-wrapper row">
                        {products.map((item) =>
                            // @TODO Need to add support for Group product.
                            undefined !== item && 'GroupProduct' !== item.__typename ? (
                                <Product key={item.id} item={item} />
                            ) : (
                                ''
                            )
                        )}
                    </div>
                </div>
            ) : (
                ''
            )}
            {paginationInfo && <Pagination paginationInfo={paginationInfo} />}
        </div>
    );
};

export default Products;
