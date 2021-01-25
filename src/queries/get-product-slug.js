import { gql } from '@apollo/client';

export default gql`
    query GET_PRODUCT_SLUGS {
        products: products {
            nodes {
              slug
            }
        }
    }
`;