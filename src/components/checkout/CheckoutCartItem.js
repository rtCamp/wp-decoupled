import Image from '../Image';

const CheckoutCartItem = ({ item }) => {
    return (
        <tr className="wd-cart-item" key={item.databaseId}>
            <td className="wd-cart-element">
                <Image
                    width={64}
                    height={64}
                    src={item?.image?.sourceUrl}
                    alt={item?.image?.altText || item?.name}
                />
            </td>
            <td className="wd-cart-element">{item.name}</td>
            <td className="wd-cart-element">${item.totalPrice.toFixed(2)}</td>
        </tr>
    );
};

export default CheckoutCartItem;
