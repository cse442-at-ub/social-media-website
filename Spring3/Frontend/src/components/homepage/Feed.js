import React from 'react';
import Post from './post';

const Feed = ({ type, posts, isLoggedIn }) => {
    return (
        <div>
            {type === 'Following' && !isLoggedIn ? (
                <p>Please log in to see the Following feed.</p>
            ) : (
                posts.map((posts, index) => (
                    <Post
                        key={index}
                        author={`${posts.first_name} ${posts.last_name}`}
                        content={posts.post_title}
                        image={`path-to-your-image-folder/${posts.post_image}.jpg`}
                        postDateTime={posts.post_datetime}
                    />
                ))
            )}
        </div>
    );
};

export default Feed;


