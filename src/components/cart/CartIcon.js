// External.
import Link from 'next/link';
import { useContext } from 'react';

// Internal.
import { AppContext } from './../context/AppContext';

const CartIcon = () => {
    const [cart] = useContext(AppContext);
    const productsCount = null !== cart ? cart.totalProductsCount : '';
    const totalPrice = null !== cart ? cart.totalProductsPrice : '';

    return (
        <>
            <Link href="/cart">
                <div className="wd-cart-wrap">
                    {totalPrice ? (
                        <span className="wp-cart-price mr-2">${totalPrice.toFixed(2)}</span>
                    ) : (
                        ''
                    )}
                    <span className="wd-cart-icon-container">
                        <i className="fas fa-shopping-cart wd-cart-icon" />
                        {productsCount ? (
                            <span className="wp-cart-count">{productsCount}</span>
                        ) : (
                            ''
                        )}
                    </span>
                </div>
            </Link>
            <style>{`
                .wd-cart-wrap {
                    cursor: pointer;
                    padding-right: 16px;
                }

                .wp-cart-price {
                    color: #fff;
                }

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
        </>
    );
};

export default CartIcon;
