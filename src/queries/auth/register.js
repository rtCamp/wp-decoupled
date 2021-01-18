import { gql } from '@apollo/client';
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
                id
                name
                email
                nicename
            }
        }
    }
`;