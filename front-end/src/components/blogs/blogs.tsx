import {useQuery, useMutation} from '@apollo/client'
import { GET_BLOGS } from '../graphql/queries';

const Blogs = () => {
    const { loading, data, error } = useQuery(GET_BLOGS);
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error...</p>;
    console.log(data);
    
    return <div>
        Blogs
    </div>
};

export default Blogs;