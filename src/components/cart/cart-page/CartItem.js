import { useState } from 'react';
import { updateCart } from '../../../utils/cart-functions';
import NextImage from '../../image';

const CartItem = ({ item, handleRemoveProductClick, setCart }) => {
    const [productCount, setProductCount] = useState(item?.qty ?? 0);

    /*
     * When user changes the qty from product input update the cart in localStorage
     * Also update the cart in global context
     *
     * @param {Object} event event
     *
     * @return {void}
     */
    const handleQtyChange = (event) => {
        if (process.browser) {
            const newQty = event.target.value;

            // Set the new qty in State
            setProductCount(newQty);

            let existingCart = localStorage.getItem('wpd-cart');
            existingCart = JSON.parse(existingCart);

            // Update the cart in localStorage.
            const updatedCart = updateCart(existingCart, item, false, newQty);

            // Update the cart in global context
            setCart(updatedCart);
        }
    };

    return (
        <tr className="wd-cart-item" key={item?.databaseId}>
            <th className="wd-cart-element wd-cart-el-close">
                <span
                    className="wd-cart-close-icon"
                    onClick={(event) => handleRemoveProductClick(event, item?.databaseId)}>
                    <i className="fas fa-times-circle" />
                </span>
            </th>
            <td className="wd-cart-element">
                <NextImage
                    src={item?.image?.sourceUrl}
                    alt={item?.image?.title}
                    width="64"
                    height="64"
                />
            </td>
            <td className="wd-cart-element">{item?.name}</td>
            <td className="wd-cart-element">${item?.price?.toFixed(2)}</td>

            {/* Qty Input */}
            <td className="wd-cart-element">
                <input
                    type="number"
                    min="1"
                    className="wd-cart-qty-input"
                    value={productCount}
                    onChange={handleQtyChange}
                />
            </td>
            <td className="wd-cart-element">{item?.totalPrice?.toFixed(2)}</td>
        </tr>
    );
};

export default CartItem;
