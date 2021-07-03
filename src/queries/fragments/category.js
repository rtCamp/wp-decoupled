import ImageFragment from './image';

const CategoryFragment = `
    fragment CategoryFragment on ProductCategory {
        name
        count
        image {
            ...ImageFragment
        }
        slug
    }
    ${ImageFragment}
`;
export default CategoryFragment;