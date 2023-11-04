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
mutation signup($name: String!, $email: String!, $password: String!){
    signup(name: $name, email:$email, password:$password){
        id
        name
        email
    }
}
`;

export const ADD_BLOG = gql`
mutation addBlog($title: String!, 
    $content: String!, $date: String!, $user: String!){
        addBlog(title: $title, content: 
            $content, date: $date, user: $user){
                title
            }
    }
`