import gql from 'graphql-tag';

export default gql`
query Product($slug: ID!) {
    product(id: $slug, idType: SLUG) {
        id
        databaseId
        averageRating
        slug
        description
        image {
            uri
            title
            srcSet
            sourceUrl
        }
        name
        ... on SimpleProduct {
            price
            id
        }
        ... on VariableProduct {
            price
            id
        }
        ... on ExternalProduct {
            price
            id
        }
        ... on GroupProduct {
            products {
                nodes {
                    ... on SimpleProduct {
                        price
                    }
                }
            }
            id
        }
    }
}
`;