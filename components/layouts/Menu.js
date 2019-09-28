import Link from "next/link";

const Menu = () => {

	return (
		<ul className="wpd-main-nav">
			<li className="wpd-main-nav__list">
				<Link href="/login"><a className="wpd-main-nav__link">Login</a></Link>
			</li>
			<li className="wpd-main-nav__list">
				<Link href="/register"><a className="wpd-main-nav__link">Register</a></Link>
			</li>
			<li className="wpd-main-nav__list">
				<a className="wpd-main-nav__link">Register</a>
			</li>
		</ul>
	)
};

export default Menu;
