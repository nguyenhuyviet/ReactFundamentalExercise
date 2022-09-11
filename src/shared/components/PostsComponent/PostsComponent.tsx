import React from 'react'
import Axios from 'axios'

interface PostDetails {
    id: number,
    title: string,
    body: string,
    userId: number
}

enum SortDirection {
    ASC = "ASC",
    DESC = "DESC"
}

enum SortColumn {
    ID = "id",
    TITLE = "title",
}

const baseURL = "https://jsonplaceholder.typicode.com/posts";

const PostsComponent = () => {
    const [posts, setposts] = React.useState<PostDetails[]>([]);
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [sortColumn, setSortColumn] = React.useState<SortColumn>(SortColumn.ID);
    const [sortDirection, setSortDirection] = React.useState<SortDirection>(SortDirection.ASC);
    React.useEffect(() => {
        Axios.get(`${baseURL}`).then((response) => {
            setposts(response.data);
        })
    },[]);
    
    let filteredPosts = posts.filter(post => post.title.toUpperCase().includes(searchValue.toUpperCase()));
    filteredPosts.sort((a: PostDetails, b: PostDetails) => {
        let value1 = a[sortColumn];
        let value2 = b[sortColumn];
        if (sortDirection === SortDirection.ASC)
        {
            if (value1 < value2) {
                return -1;
            }
            if (value1 > value2) {
                return 1;
            }
            return 0;
        }
        else
        {
            if (value1 < value2) {
                return 1;
            }
            if (value1 > value2) {
                return -1;
            }
            return 0;
        }
      });

      const OnChangeSearchValue = (event: any) => {
        setSearchValue(event.target.value);
    }

    const OnClickHeaderName = (column : SortColumn) => {
        if (sortColumn === column)
        {
            if (sortDirection === SortDirection.ASC)
            {
                setSortDirection(SortDirection.DESC);
            }
            else
            {
                setSortDirection(SortDirection.ASC);
            }
        }
        else
        {
            setSortDirection(SortDirection.ASC);
        }

        setSortColumn(column);
    }

    const OnClickRemove = (post: PostDetails) => {
        filteredPosts.forEach( (item, index) => {
            if(item === post) filteredPosts.splice(index,1);
          });
        setposts(filteredPosts);
    }

    return (
        <div>
            <input type="text" placeholder="Search by title" value={searchValue} onChange={OnChangeSearchValue}></input><br/>
            <span>sort column: {sortColumn}</span><br/>
            <span>sort direction: {sortDirection}</span><br/>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => OnClickHeaderName(SortColumn.ID)}>Id</th>
                        <th onClick={() => OnClickHeaderName(SortColumn.TITLE)}>Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {filteredPosts.map((postDetails) => (
                    <tr key={postDetails.id}>
                        <td>{postDetails.id}</td>
                        <td>{postDetails.title}</td>
                        <td>
                            <a href={'/posts/' + postDetails.id}>View detail</a><br/>
                            <button onClick={() => OnClickRemove(postDetails)}>Remove</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>            
        </div>
    );
}

export default PostsComponent