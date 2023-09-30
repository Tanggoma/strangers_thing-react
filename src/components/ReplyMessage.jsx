import { useState, useEffect } from "react"
import { postMessage } from "../API"
import { useParams } from "react-router-dom";

const ReplyMessage = ({ token, onClose }) => {

    const [replyMsg, setReplyMsg] = useState('');

    const { id } = useParams();

    useEffect(() => {
        const replyMessage = async () => {
            try {
                if (replyMsg) {
                    const response = await postMessage(id, token, replyMsg);
                    const reply = await response.json();
                }
            } catch (error) {
                console.log(error);
            }
        }
        replyMessage();
    }, [])

    const handleReply = (e) => {
        e.preventDefault()
        console.log('reply');
        alert('There is no API reference to send message back to the author, but this is for testing reply:)')
        onClose()

    }

    const handleCancel = () => {
        onClose()
    }

    return (
        <div>
            <form onSubmit={handleReply}>
                <label> Reply:
                    <input
                        type="text"
                        value={replyMsg}
                        onChange={(e) => setReplyMsg(e.target.value)}
                    />
                </label>
                <button id='submit-button' type='submit'> Send </button>
                <button id='cancel-button' type='button' onClick={handleCancel}> Cancel </button>
            </form>
        </div>
    )
}

export default ReplyMessage