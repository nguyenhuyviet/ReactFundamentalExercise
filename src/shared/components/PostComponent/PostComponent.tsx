import React from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom';

interface PostDetails {
    id: number,
    title: string,
    body: string
}

const baseURL = "https://jsonplaceholder.typicode.com/posts";

const PostComponent = () => {
    let { id } = useParams();
    const [post, setpost] = React.useState<PostDetails>({
        id: 0,
        title: '',
        body: ''
    });
    React.useEffect(() => {
        Axios.get(`${baseURL}/${id}`).then((response) => {
            setpost(response.data)
        })
    },[id]);

    return (
        <div>
            <span>Id: {post.id}</span><br/>
            <span>Title: {post.title}</span><br/>
            <span>Body: {post.body}</span><br/>
        </div>
    );
}

export default PostComponent