import React from 'react';
import EmptyPost from '../assets/nopost.svg';
import { CreateFeedback } from './CreateFeedback';
import { useState } from "react";


export const NoPost = ({ getPosts }: any) => {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="wrapNoPost">
            <img className='emptyPostBg' src={EmptyPost} alt="Empty post" />
            <h2 className='emptyPostTitle' >There is no feedback</h2>
            <p className='emptyPostDesc' >Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
            <button className='addFeedback' onClick={() => setOpen(true)}>+ Add Feedback</button>
            <CreateFeedback open={open} handleClose={handleClose} getPosts={getPosts} />
        </div>
    )
}
