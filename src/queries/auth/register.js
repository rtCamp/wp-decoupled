import { gql } from '@apollo/client';
import UserFragment from '../fragments/user';

/**
 * Register user mutation query.
 */
export default gql`
    mutation RegisterMyUser($username: String!, $email: String!, $password: String!) {
        registerUser(
            input: {
                clientMutationId: "CreateUser"
                username: $username
                email: $email
                password: $password
            }
        ) {
            user {
                ...UserFragment
                nicename
            }
        }
    }
    ${UserFragment}
`;