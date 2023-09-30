import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { makePost } from '../API';

export const CreatePosts = ({ token }) => {

    const navigate = useNavigate();

    // define state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(true);

    const handleClick = () => {
        navigate('/profile')
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const postData = {
            title,
            description,
            price,
            location,
            willDeliver
        }

        try {
            const response = await makePost(token, postData);
            const post = await response.data

        } catch (error) {
            console.log('Oops, something went wrong with adding post!', err)
        }
        alert('new post added!')
        navigate('/profile');
    }

    return (
        <div className='new-post-body'>
            <div className='new-post-container'>
                <form id="new-post" onSubmit={handleSubmit}>
                    <h2>Sell an item</h2>

                    <label> Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="What you are selling?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <br />
                    <label> Description: </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Describe your item"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <br />
                    <label>Pricing:</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        placeholder="Set you price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <br />
                    <label> Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Location of your item"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                    <br />
                    <label>Delivery:</label>
                    <select
                        id="willDeliver"
                        name="willDeliver"
                        value={willDeliver}
                        onChange={(e) => setWillDeliver(e.target.value)}
                        required
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <br />
                    <button id='create-button'> Create</button>

                </form>
                <button id='back-button' onClick={handleClick}> Back</button>
            </div>
        </div>
    )
}
