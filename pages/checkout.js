import Layout from '../src/components/layouts/Layout';
import CheckoutForm from '../src/components/checkout/CheckoutForm';
import { Heading } from '../src/components/typography';

const Checkout = () => {
    return (
        <Layout>
            <div className="container">
                <Heading className="mt-5 mb-4">
                    Checkout Page.
                </Heading>
                <CheckoutForm />
            </div>
        </Layout>
    );
};

export default Checkout;
