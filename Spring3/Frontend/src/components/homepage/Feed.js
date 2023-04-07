import React from "react";

const Feed = ({ type }) => {
    const content = type === "For You" ? "For You Feed" : "Following Feed";

    return (
        <div>
            <h2>{type} Feed</h2>
            <p>{content}</p>
        </div>
    );
};

export default Feed;