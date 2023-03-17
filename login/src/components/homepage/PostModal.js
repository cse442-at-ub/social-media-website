import React, { useState } from "react";
import "./PostModal.css";
import axios from "axios";

const PostModal = ({ onClose }) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Text:", text);
        console.log("Image:", image);
        axios.post('post.php', {
            Text: text,
            Image: image
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    };

    return (
        <div className="post-modal-overlay">
            <div className="post-modal">
                <form onSubmit={handleSubmit}>
                    <h2>Create Post</h2>
                    <label>
                        Text:
                        <textarea value={text} onChange={handleTextChange} />
                    </label>
                    <label>
                        Image:
                        <input type="file" onChange={handleImageChange} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <button className="post-modal-close" onClick={onClose}>
                </button>
            </div>
        </div>
    );
};

export default PostModal;