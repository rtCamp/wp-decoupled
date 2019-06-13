import { useContext } from 'react';
import { AppContext } from "./context/AppContext";

const CartIcon = () => {

	const [ cart, setCart ] = useContext( AppContext );
	const productsCount = ( null !== cart ) ? cart.totalProductsCount : '';

	return (
		<React.Fragment>
			<span className="wd-cart-icon-container">
				<i className="fas fa-shopping-cart wd-cart-icon"/>
				{ productsCount ? <span className="wp-cart-count">{ productsCount }</span> : '' }
			</span>
			<style jsx>{`
				.wd-cart-icon-container {
					position: relative;
				}
				
				.wd-cart-icon {
					color: #fff;
					font-size: 20px;
				}
			
		        .wp-cart-count {
					top: -13px;
				    left: 12px;
				    padding-left: 5px;
				    padding-right: 5px;
				    line-height: 16px;
				    color: #fff;
				    min-height: 16px;
				    font-weight: 700;
				    border-radius: 50%;
				    background-color: #868484;
				    position: absolute;
		        }
	      `}</style>
		</React.Fragment>

	)
};

export default CartIcon;
