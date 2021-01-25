import { gql } from '@apollo/client';
import CategoryFragment from './fragments/category';
import ProductFragment from './fragments/product';

export default gql`
    query Category($slug: ID!) {
        productCategory(id: $slug, idType: SLUG) {
            ...CategoryFragment
            products {
                nodes {
                  ...ProductFragment
                }
            }
        }
    }
    ${CategoryFragment}
    ${ProductFragment}
`;