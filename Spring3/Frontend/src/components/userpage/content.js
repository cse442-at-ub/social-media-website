import React from "react";

const Feed = ({ type }) => {
    let content;

    if (type === "My page") {
        content = "This is My Page feed";
    } else if (type === "My following") {
        content = "This is My Follower feed";
    } else if (type === "My fans") {
        content = "This is My Fans feed";
    } else if (type === "My Blog"){
        content = "Invalid type";
    }
    return (
        <div>
            <h2>{type} Feed</h2>
            <p>{content}</p>
        </div>
    );
};

export default Feed;