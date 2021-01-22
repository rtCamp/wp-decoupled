import { gql } from '@apollo/client';

export default gql`
    query {
        productCategories {
            nodes {
                slug
            }
        }
    }
`;