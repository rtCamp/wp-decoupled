import { gql } from '@apollo/client';
import UserFragment from '../fragments/user';
/**
 * Login user mutation query.
 */
export default gql`
    mutation LoginUser($username: String!, $password: String!) {
        login(input: { clientMutationId: "uniqueId", username: $username, password: $password }) {
            authToken
            user {
                ...UserFragment
                userId
                nicename
            }
        }
    }
    ${UserFragment}
`;
