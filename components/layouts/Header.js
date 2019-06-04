const Header = () => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
		<a className="navbar-brand" href="#">WP Decoupled</a>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
		        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
		</button>

		<div className="collapse navbar-collapse" id="navbarColor01">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active">
					<a className="nav-link" href="#">Categories <span className="sr-only">(current)</span></a>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="#">MyAccount</a>
				</li>
			</ul>
		</div>
	</nav>
);

export default Header;
