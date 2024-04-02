import React from 'react'

export default function SearchBar() {
    return (
        <form id="search-form">
            <input  type="search"
                id="search-input"
                placeholder="Search for movie title..."
                aria-label="Search site for movies"/>
            <input type="submit" value="Search"/>
        </form>
    )
}
