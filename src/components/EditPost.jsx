import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { updatePost } from '../API';

const EditPost = ({ token }) => {

    const { postId } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(true);

    const handleBackButton = () => {

        navigate(`/my-posts`)

    }

    const handleEdit = async (e) => {
        e.preventDefault();

        const postData = {
            title,
            description,
            price,
            location,
            willDeliver
        }

        const filteredPostData = Object.fromEntries(
            Object.entries(postData).filter(([_, value]) => value !== '')
        );

        try {
            const response = await updatePost(postId, token, filteredPostData);

        } catch (error) {
            console.log(error);
        }
        alert('updated successfully')
        navigate(`/profile`)
    }

    return (
        <div>
            <form onSubmit={handleEdit} >
                <h2> Edit post </h2>

                <label>Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                />
                <br />
                <label>Description :</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}

                />
                <br />
                <label>Price:</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}

                />
                <br />
                <label>Location:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}

                />
                <br />
                <label>Deliver:</label>
                <select
                    id="willDeliver"
                    name="willDeliver"
                    value={willDeliver}
                    onChange={(e) => setWillDeliver(e.target.value)}

                >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                <br />
                <button id='save-button' type='submit' > Save</button>
                <button id='back-button' type='button' onClick={handleBackButton}> Back</button>

            </form>

        </div>
    )
}

export default EditPost

