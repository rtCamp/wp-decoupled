import gql from 'graphql-tag';

export default gql`
    query GET_PRODUCT_SLUGS {
        products: products {
            edges {
                node {
                    id
                    databaseId
                    name
                    slug
                }
            }
        }
    }
`;