import {gql} from '@apollo/client'

export const USER_LOGIN = gql`
mutation login($email: String!, $password: String!){
    login(email:$email, password:$password){
        id
        name
        email
    }
}
`;

export const USER_SIGNUP = gql`
mutation login($email: String!, $password: String!){
    login(email:$email, password:$password){
        id
        name
        email
    }
}
`;