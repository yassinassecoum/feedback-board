import React from 'react'
import headerBG from '../assets/background-header-desktop.png';

export const SideHeader = () => {
    return (
        <div className="wrap-header">
            <header>
                <img className="bg-header" src={headerBG} alt="header" />
                <div className="content-header">
                    <h2 id="headerH2">
                        Frontend Mentor
                    </h2>
                    <p id="headerP">Feedback board</p>
                </div>
            </header>
        </div>
    )
}
