import React, { useState } from "react";
import "./PostModal.css";
import axios from "axios";
import withAuth from '../../auth.js';

const PostModal = ({ onClose, isLoggedIn }) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [charCount, setCharCount] = useState(0);
    const handleTextChange = (event) => {
        setText(event.target.value);
        setCharCount(event.target.value.length);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (charCount > 500) {
            alert("Text must be no more than 500 characters.");
            return;
        }

        if (!isLoggedIn) {
            alert("Please log in to create a post.");
            return;
        }

        const formData = new FormData();
        formData.append("Text", text);
        if (image) {
            formData.append("Image", image);
        }
        console.log("Text:", text);
        console.log("Image:", image);
        axios.post('handle_homepage.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                console.log(response);
                alert("Your post has been submitted. Please refresh the page.");
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
                        <textarea value={text} onChange={handleTextChange} maxLength="500" />
                        <div>{charCount}/500</div>
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

export default withAuth(PostModal);