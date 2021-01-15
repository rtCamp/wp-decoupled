import gql from 'graphql-tag';
import ProductFragment from './fragments/product';

export default gql`
    query {
        products(first: 50) {
            nodes {
                ...ProductFragment
            }
        }
    }
    ${ProductFragment}
`;