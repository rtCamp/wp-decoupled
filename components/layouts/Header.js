import Link from 'next/link';

const Header = () => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
		<Link href="/"><a className="navbar-brand">WP Decoupled</a></Link>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
		        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
		</button>

		<div className="collapse navbar-collapse" id="navbarColor01">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active">
					<Link href="/"><a className="nav-link">Categories</a></Link>
				</li>
				<li className="nav-item">
					<Link href="/"><a className="nav-link">My Account</a></Link>
				</li>
			</ul>
		</div>
	</nav>
);

export default Header;
