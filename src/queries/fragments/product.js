import ImageFragment from './image';

const ProductFragment = `
    fragment ProductFragment on Product {
        id
        databaseId
        averageRating
        slug
        description
        image {
            ...ImageFragment
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
        galleryImages {
            edges {
                node {
                    ...ImageFragment
                }
            }
        }
    }
    ${ImageFragment}
`;
export default ProductFragment;
