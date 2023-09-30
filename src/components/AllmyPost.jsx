import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPosts, postMessage } from '../api/index';

const AllmyPost = ({ token }) => {

    // state declare
    const [posts, setPosts] = useState([]);
    const [clickSendMessage, setClickSendMessage] = useState(false);
    const [clickPostId, setClickPostId] = useState(null);
    const [message, setMessage] = useState('');
    const [search, setSearch] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [isLoading, setIsLoading] = useState(true)

    // const [loggedUser, setLoggedUser] = useState(localStorage.getItem('username'))
    const username = localStorage.getItem('username')

    useEffect(() => {
        fetchPostsData();
    }, []);

    const fetchPostsData = async () => {
        try {
            const response = await fetchPosts();
            const data = response.data.posts;
            localStorage.getItem('username')
            setPosts(data);
            setIsLoading(false);

        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {

        // Filter posts based on the search query
        const filtered = posts.filter(post => {
            const titleMatch = post.title && post.title.toLowerCase().includes(search.toLowerCase());
            const descriptionMatch = post.description && post.description.toLowerCase().includes(search.toLowerCase());
            const priceMatch = post.price && post.price.toLowerCase().includes(search.toLowerCase());
            const sellerMatch = post.author.username && post.author.username.toLowerCase().includes(search.toLowerCase());
            const locationMatch = post.location && post.location.toLowerCase().includes(search.toLowerCase());
            return titleMatch || descriptionMatch || priceMatch || sellerMatch || locationMatch;
        });
        setFilteredPosts(filtered);

    }, [search, posts]
    );

    // navigate hook
    const navigate = useNavigate();

    const handleAddNewPost = () => {
        navigate('/add');
    }

    const sendMessage = (id) => {
        setClickSendMessage(true);
        setClickPostId(id);

    }

    const handleCloseModal = () => {
        setMessage('');
        setClickSendMessage(false);
    }

    const submitMessage = async (id) => {
        try {
            const response = await postMessage(id, token, message);
            console.log(response);
            setMessage('');

        } catch (error) {
            console.log(error)
        }
        setClickSendMessage(false)
        alert('Messege sent')
    }

    const handleCancel = () => {
        setMessage('');
        setClickSendMessage(false)
    }

    return (
        <div>
            <div className='allmypost-nav'>
                <form className='search-form'>
                    <label>
                        <input
                            type="text"
                            value={search}
                            placeholder="🔍 Search posts"
                            onChange={(e) => setSearch(e.target.value)} />
                    </label>
                </form>

                <button className='new-post-button' onClick={handleAddNewPost}> + new post</button>
            </div>

            <div className='all-post-container'>
                {username && posts && filteredPosts.map((post => (
                    <div className='all-post' key={post._id}>
                        <h2 className='all-post-title'> {post.title}</h2>
                        <p className='all-post-description'> {post.description} </p>
                        <h4> <span id='header'> Price:</span>  {post.price} </h4>
                        <h4> <span id='header'> Seller:</span>  {post.author.username}</h4>
                        <h4> <span id='header'> Location:</span>{post.location}</h4>
                        <h4> <span id='header'> Delivery:</span> {post.willDeliver == true ? 'Yes' : 'No'}</h4>

                        {username && post.author.username !== username &&
                            (
                                <button id='sendmsg-button' onClick={() => sendMessage(post._id)}> Send Message</button>
                            )}

                        {clickSendMessage && post._id === clickPostId && (
                            <div>
                                <div className={`modal-backdrop ${clickSendMessage ? 'active' : ''}`} onClick={handleCloseModal}></div>
                                <div className={`modal-content ${clickSendMessage ? 'active' : ''}`}>
                                    <form className='modal-msg' onSubmit={(e) => {
                                        e.preventDefault();
                                        submitMessage(post._id);
                                    }}>
                                        <label>Message:
                                            <br />
                                            <textarea
                                                value={message}

                                                row='200'
                                                cols='80'
                                                onChange={(e) => setMessage(e.target.value)} />
                                        </label>
                                        <button id='submit-button' type='submit'> Send </button>
                                        <button id='cancel-button' type='button' onClick={handleCancel}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )))}
            </div>
        </div>
    )
}

export default AllmyPost
