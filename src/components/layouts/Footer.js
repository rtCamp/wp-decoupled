const Footer = () => (
    <footer className="page-footer font-small cyan darken-3">
        {/* Footer Elements */}
        <div className="container text-center">
            {/* Grid row*/}
            <div className="row">
                {/* Grid column */}
                <div className="col-md-12 mt-5">
                    <div className="mb-5 flex-center">
                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com/rtCamp.solutions"
                            target="_blank"
                            className="fb-ic">
                            <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x">
                                {' '}
                            </i>
                        </a>
                        {/* Twitter */}
                        <a href="https://twitter.com/rtcamp" target="_blank" className="tw-ic">
                            <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                        </a>
                        {/*Linkedin */}
                        <a
                            href="https://www.linkedin.com/company/rtcamp/"
                            target="_blank"
                            className="li-ic">
                            <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x">
                                {' '}
                            </i>
                        </a>
                        {/*Instagram*/}
                        <a
                            href="https://www.instagram.com/rtcamp/"
                            target="_blank"
                            className="ins-ic">
                            <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x">
                                {' '}
                            </i>
                        </a>
                    </div>
                </div>
                {/* Grid column */}
            </div>
            {/* Grid row*/}
        </div>
        {/* Footer Elements */}
        {/* Copyright */}
        <div className="footer-copyright text-center py-3">
            © 2019 Copyright:
            <a href="https://rtCamp.com"> rtCamp.com</a>
        </div>
        {/* Copyright */}
    </footer>
);

export default Footer;
