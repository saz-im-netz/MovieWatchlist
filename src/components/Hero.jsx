import React from 'react'
import SearchBar from './SearchBar'

export default function Hero() {
    return (
        <header>
            <div class="bg"></div>
            <h1>Find your film</h1>
            <h3><a href="#">My Watchlist</a></h3>

            <SearchBar />
        </header>
    )
}