import Layout from '../src/components/layouts/Layout';
import CheckoutForm from '../src/components/checkout/CheckoutForm';

const Checkout = () => {
    return (
        <Layout>
            <div className="container">
                <h1 className="mt-5 mb-4">Checkout Page.</h1>
                <CheckoutForm />
            </div>
        </Layout>
    );
};

export default Checkout;
