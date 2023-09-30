import { myData } from '../API';
import { useState, useEffect } from 'react';
import { deletePost } from '../API';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import EditPost from './EditPost';

const MyPosts = ({ token }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [userData, setUserData] = useState([]);
    const [postData, setPostData] = useState([]);
    const [selectedPostMessages, setSelectedPostMessages] = useState([]);
    const [deletedPostIds, setDeletedPostIds] = useState(() => {
        const storedDeletedPostIds = localStorage.getItem('deletedPostIds');
        return storedDeletedPostIds ? JSON.parse(storedDeletedPostIds) : [];
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await myData(token);
            setUserData(response.data.username);
            setPostData(response.data.posts);
            setIsLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (postId) => {
        try {
            const result = await deletePost(postId, token);
            console.log(result);
            console.log(postData);

            if (result.success) {
                // Update the postData state to remove the deleted post
                setPostData(prevData => prevData.filter(post => post._id !== postId));

                const updatedDeletedPostIds = [...deletedPostIds, postId];
                localStorage.setItem('deletedPostIds', JSON.stringify(updatedDeletedPostIds));
                setDeletedPostIds(updatedDeletedPostIds);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (postId) => {
        navigate(`/my-posts/edit/${postId}`);
    }

    return (
        <div>
            {userData ? (
                <div>
                    <h2 id='mypost-h2'>{userData}'s posts</h2>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}

            {isLoading ? <h2 style={{ color: 'white', textAlign: 'center', margin: '3rem' }}>Loading...</h2>
                :
                postData && postData.length === 0 ? (
                    <p style={{ color: 'white', textAlign: 'center' }}>No posts from you. Click<Link to="/add" style={{ textDecoration: 'none', color: 'yellow' }}> here</Link> to create a new post.</p>
                ) : (

                    <div className='all-post-container'>
                        {
                            postData &&
                            postData
                                .filter(post => !deletedPostIds.includes(post._id))
                                .map((post) => (
                                    <div className='all-post' key={post._id}>
                                        <h2 className='all-post-title'>{post.title}</h2>
                                        {location.pathname === `/my-posts/edit/${post._id}` ? (
                                            <EditPost token={token} post={post} onSave={() => handleEdit(post._id)} onCancel={() => navigate('/my-posts')} />
                                        ) : (
                                            <>
                                                <p className='all-post-description'>{post.description}</p>
                                                <h4> <span id='header'>Price: </span> {post.price}</h4>
                                                <h4><span id='header'>Location: </span> {post.location}</h4>
                                                <h4><span id='header'>Delivery: </span>  {post.willDeliver == true ? "Yes" : "No"}</h4>
                                                <h4><span id='header'>Created: </span> {new Date(post.createdAt).toLocaleString()}</h4>
                                                <h4><span id='header'>Last Update: </span>  {new Date(post.updatedAt).toLocaleString()}</h4>
                                                <button id='edit-button' onClick={() => handleEdit(post._id)}> Edit </button>
                                                <button id='delete-button' onClick={() => handleDelete(post._id)}> Delete </button>
                                                {/* <button onClick={() => handleMessage(post.messages)}> See Message </button> */}
                                                {selectedPostMessages.length > 0 && selectedPostMessages.map((message) => (
                                                    <div key={message._id}>
                                                        <p>From: {message.fromUser.username}</p>
                                                        <p>Content: {message.content}</p>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                ))
                        }</div>
                )


            }
        </div>
    )
}

export default MyPosts;


