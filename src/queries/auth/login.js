import { gql } from '@apollo/client';
/**
 * Login user mutation query.
 */
export default gql`
    mutation LoginUser($username: String!, $password: String!) {
        login(input: { clientMutationId: "uniqueId", username: $username, password: $password }) {
            authToken
            user {
                id
                userId
                name
                email
                nicename
            }
        }
    }
`;