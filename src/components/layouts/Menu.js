import Link from 'next/link';

const Menu = ({items}) => {

    return (
        <ul className="wpd-main-nav">
            {items?.map((menu) => (
                <li key={menu?.id} className="wpd-main-nav__list">
                    <Link href={menu?.path}>
                        <a className="wpd-main-nav__link">{menu?.label}</a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Menu;
