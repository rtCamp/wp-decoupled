import { gql } from '@apollo/client';
import ProductFragment from './fragments/product';

export default gql`
  query Product($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      ...ProductFragment
    }
  }
  ${ProductFragment}
`;
