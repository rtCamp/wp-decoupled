import { gql } from '@apollo/client';
import ProductFragment from './fragments/product';

export default gql`
    query Products($offset: Int! = 0, $size: Int! = 9) {
        products(where: { offsetPagination: { offset: $offset, size: $size } }) {
            nodes {
                ...ProductFragment
            }
            pageInfo {
                offsetPagination {
                    hasMore
                    hasPrevious
                    total
                }
            }
        }
    }
    ${ProductFragment}
`;
