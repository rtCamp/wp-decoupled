import { gql } from '@apollo/client';
import ProductFragment from './fragments/product';

export default gql`
    query GET_PRODUCT_SLUGS {
        products: products {
            edges {
                node {
                    ...ProductFragment
                }
            }
        }
    }
    ${ProductFragment}
`;
