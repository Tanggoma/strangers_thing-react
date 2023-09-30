import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { myData } from '../api/index';
import ReplyMessage from './ReplyMessage';

const MyMessage = ({ token }) => {

    const [messages, setMessages] = useState([]);
    const [clickedMessageId, setClickedMessageId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await myData(token);
                const messages = await response.data.messages
                setMessages(messages);
                setIsLoading(false);
                // console.log(messages) check message

            } catch (error) {
                console.log(error);
            }
        }
        fetchMessage();
    }, []);

    const uniqueHeaders = new Set();
    messages.forEach((myMessage) => {
        const header = myMessage.post.author.username === username ? 'to me' : 'from me';
        uniqueHeaders.add(header);
    });

    const groupedMessages = {};
    messages.forEach((message) => {
        const postTitle = message.post.title;
        const postId = message.post._id;
        if (!groupedMessages[postTitle]) {
            groupedMessages[postTitle] = [];
        }
        groupedMessages[postTitle].push(message);
    });

    const handleReplyClick = (messageId) => {
        if (clickedMessageId === messageId) {
            setClickedMessageId(null); // Clear the clicked message ID to hide the form
        } else {
            setClickedMessageId(messageId);
        }
    };

    return (
        <div>
            {
                isLoading ? <h2 style={{ color: 'white', textAlign: 'center', margin: '3rem' }}>Loading...</h2>
                    : messages.length === 0 ?
                        <h2 style={{ color: 'white', textAlign: 'center', margin: '3rem' }}>No messages to show.</h2>
                        :
                        [...uniqueHeaders].map((header) => (
                            <div key={header}>
                                <h1 className='all-post-h1'>Messages {header.charAt(0).toUpperCase() + header.slice(1)}: </h1>
                                {Object.entries(groupedMessages).map(([postTitle, messageGroup]) => {
                                    const isMessageToMe = messageGroup[0].post.author.username === username;
                                    const isMessageFromMe = messageGroup[0].fromUser.username === username;

                                    if ((isMessageToMe && header === 'to me') || (!isMessageToMe && header === 'from me')) {
                                        return (
                                            <div className='all-post-container'>
                                                <div className='all-post' key={postTitle}>
                                                    <h2 className='all-post-title'>{postTitle}</h2>

                                                    {messageGroup.map((message) => (
                                                        <div className='my-message' key={message._id}>

                                                            {isMessageToMe ? null : <h4><span id='header'> Author:</span> {message.post.author.username}</h4>}
                                                            {isMessageFromMe ? null : <h4><span id='header'> From:</span> {message.fromUser.username}</h4>}

                                                            <div className='my-message' key={message._id}>
                                                                {/* Render message content */}
                                                                {isMessageToMe ? <Link
                                                                    to={`reply/${message.post._id}`}
                                                                    className='content-msg'
                                                                    onClick={() => handleReplyClick(message._id)} // Set clicked message ID
                                                                >
                                                                    <p id='msg-to-me'>{message.content}</p>
                                                                </Link> : <p id='msg-from-me'>{message.content}</p>}

                                                                {/* Conditionally render reply form */}
                                                                {clickedMessageId === message._id && (
                                                                    <ReplyMessage token={token} id={message.post._id} onClose={() => handleReplyClick(message._id)} />
                                                                )}
                                                            </div>

                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        ))
            }
        </div>)
}


export default MyMessage