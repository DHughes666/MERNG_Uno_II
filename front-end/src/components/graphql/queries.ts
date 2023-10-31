import {gql} from '@apollo/client'

export const GET_BLOGS = gql`
{
    blogs {
        id
        title
        user {
            name
            email
        }
        content
        date
    }
}
`;