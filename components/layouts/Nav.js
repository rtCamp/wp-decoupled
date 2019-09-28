import Link from "next/link";
import CartIcon from "../cart/CartIcon";

const Nav = () => {
	return (
		<nav className="wd-navbar navbar navbar-expand-lg navbar-dark bg-primary">
			<Link href="/"><a className="navbar-brand">WP Decoupled</a></Link>

			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
			        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
			</button>

			<div className="collapse navbar-collapse" id="navbarColor01">

			</div>
			<div className="cart">
				<CartIcon />
			</div>
		</nav>
	)
};

export default Nav;
