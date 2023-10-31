import {gql} from '@apollo/client'
import { title } from 'process'

export const GET_BLOGS = gql`
{
    blogs {
        id
        title
        user {
            name
            email
        }
    }
}
`;