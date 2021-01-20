import NextImage from '../image';

const CheckoutCartItem = ({ item }) => {
    return (
        <tr className="wd-cart-item" key={item?.databaseId}>
            <td className="wd-cart-element">
                <NextImage
                    src={item?.image?.sourceUrl}
                    alt={item?.image?.title}
                    width="64"
                    height="64"
                />
            </td>
            <td className="wd-cart-element">{item?.name}</td>
            <td className="wd-cart-element">${item?.totalPrice?.toFixed(2)}</td>
        </tr>
    );
};

export default CheckoutCartItem;
