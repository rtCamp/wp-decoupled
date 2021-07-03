import { gql } from '@apollo/client';
import CategoryFragment from './fragments/category';

export default gql`
    query {
        productCategories {
            nodes {
                ...CategoryFragment
            }
        }
    }
    ${CategoryFragment}
`;