import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {
    const [query, setQuery] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            search();
        }
    };

    const search = () => {
        console.log(`Searching for ${query}...`);
    };

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default SearchBar;