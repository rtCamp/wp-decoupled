import { gql } from '@apollo/client';
import CategoryFragment from './fragments/category';

export default gql`
    query Category($slug: ID!) {
        productCategory(id: $slug, idType: SLUG) {
            ...CategoryFragment
        }
    }
    ${CategoryFragment}
`;