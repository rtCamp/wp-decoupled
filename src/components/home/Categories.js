import Link from 'next/link';

const Categories = ({ categories }) => {
    return (
        <div className="container">
            <h2 className="text-center mb-4">Shop by Category</h2>
            <div className="woocommerce">
                <div className="products row mx-auto">
                    {
                        categories.map(category => (
                            undefined !== category 
                            && 0 !== category.count
                            && null !== category.count ? (
                                <div className="category-container col-md-3 mb-5">
                                    <Link href={`/category/${category.slug}`}>
                                        <a className="category-link">
                                            <img
                                                className='category-image'
                                                src="http://headless.test/wp-content/uploads/2021/01/single-1.jpg"
                                                alt={category.name}
                                                sizes="(max-width: 324px) 100vw, 324px"
                                            />
                                            <h5 className="category-name">
                                                {category.name} <mark className="count">({category.count})</mark>
                                            </h5>
                                        </a>
                                    </Link>
                                </div>
                            ) : null
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Categories;
