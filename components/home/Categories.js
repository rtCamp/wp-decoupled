import Link from 'next/link';

const Categories = () => {
	return (
		<div className="container">
			<h2 className="text-center mb-4">Shop by Category</h2>
			<div className="woocommerce">
				<ul className="products row mx-auto">
					<li className="product-category product first col-md-4">
						<Link as={`/`} href={`/`}><a className="">
							<img src="https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/accessories.jpg" alt="Accessories" width="324" height="324" srcSet="https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/accessories.jpg 801w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/accessories-150x150.jpg 150w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/accessories-300x300.jpg 300w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/accessories-768x768.jpg 768w" sizes="(max-width: 324px) 100vw, 324px" />
							<h2 className="woocommerce-loop-category__title">
								Accessories <mark className="count">(4)</mark>
							</h2>
						</a></Link>
					</li>
					<li className="product-category product col-md-4">
						<Link as={`/`} href={`/`}><a className="">
							<img src="https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/hoodies.jpg" alt="Hoodies" width="324" height="324" srcSet="https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/hoodies.jpg 800w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/hoodies-150x150.jpg 150w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/hoodies-300x300.jpg 300w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/hoodies-768x768.jpg 768w" sizes="(max-width: 324px) 100vw, 324px" />
							<h2 className="woocommerce-loop-category__title">
								Hoodies <mark className="count">(4)</mark>
							</h2>
						</a></Link>
					</li>
					<li className="product-category product last col-md-4">
						<Link as={`/`} href={`/`}><a className="">
							<img src="https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/tshirts.jpg" alt="Tshirts" width="324" height="324" srcSet="https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/tshirts.jpg 801w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/tshirts-150x150.jpg 150w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/tshirts-300x300.jpg 300w, https://woo-vsf.dev5.rt.gw/wp-content/uploads/2019/05/tshirts-768x768.jpg 768w" sizes="(max-width: 324px) 100vw, 324px" />
							<h2 className="woocommerce-loop-category__title">
								Tshirts <mark className="count">(4)</mark>
							</h2>
						</a></Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Categories;
