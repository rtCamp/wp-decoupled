import Link from 'next/link';
import Image from '../Image';
const Categories = ({ categories }) => {
    return (
        <div className="container">
            <h2 className="text-center mb-4">Shop by Category</h2>
            <div className="woocommerce">
                <div className="products row mx-auto">
                    {
                        categories.map(category => (
                            category && category.count ? (
                                <div className="category-container col-md-3 mb-5">
                                    <Link as={`/`} href={`/`}>
                                        <a className="category-link">
                                            <Image
                                                src={category?.image?.sourceUrl}
                                                alt={category?.name}
                                                width={324}
                                                height={324}
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
