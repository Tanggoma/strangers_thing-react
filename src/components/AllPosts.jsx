import { useState, useEffect } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { fetchPosts } from '../api/index';

const AllPosts = () => {

    const posts = useLoaderData();

    const [search, setSearch] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts);

    const handleSearch = () => {
        const filtered = posts.filter(post => {
            const titleMatch = post.title && post.title.toLowerCase().includes(search.toLowerCase());
            const descriptionMatch = post.description && post.description.toLowerCase().includes(search.toLowerCase());
            const priceMatch = post.price && post.price.toLowerCase().includes(search.toLowerCase());
            const sellerMatch = post.author.username && post.author.username.toLowerCase().includes(search.toLowerCase());
            const locationMatch = post.location && post.location.toLowerCase().includes(search.toLowerCase());

            return titleMatch || descriptionMatch || priceMatch || sellerMatch || locationMatch;
        });

        setFilteredPosts(filtered);
    };

    useEffect(() => {
        handleSearch();
    }, [search]);


    return (
        <>
            <h1 className='all-post-h1'> Curious about the listings below? Feel free to <Link className='link' to='/register'> Sign up </Link> or <Link className='link' to='/login'>Log in </Link>to start selling and exploring! </h1>
            <div className='allpost-nav'>
                <form className='search-form'>
                    <label>
                        <input
                            type="text"
                            value={search}
                            placeholder="🔍 Search posts"
                            onChange={(e) => setSearch(e.target.value)} />
                    </label>
                </form>
            </div>
            <div className='all-post-container'>

                {filteredPosts.map((post => (
                    <div className='all-post' key={post._id}>
                        <h2 className='all-post-title'> {post.title}</h2>
                        <p className='all-post-description'> {post.description} </p>
                        <h4> <span id='header'> Price:</span>  {post.price} </h4>
                        <h4> <span id='header'> Seller: </span> {post.author.username}</h4>
                        <h4> <span id='header'>Location: </span>{post.location}</h4>
                    </div>
                )))}
            </div>
        </>
    )
}

export default AllPosts

// loader function 
export const postsloader = async () => {
    const response = await fetchPosts();
    const data = await response.data.posts
    return data;
}