import Layout from '../components/layouts/Layout';
import fetch from 'isomorphic-unfetch';


const Index = () => (
	<Layout>
		Hello
	</Layout>
);

Index.getInitialProps = async () => {
	const res = async fetch( `` )
};

export default Index;
