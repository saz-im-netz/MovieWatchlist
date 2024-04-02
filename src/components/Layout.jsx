import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className="site-wrapper">
            <Hero />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
