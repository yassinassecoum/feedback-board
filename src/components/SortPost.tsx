import React, { useState } from 'react'
import { CreateFeedback } from './CreateFeedback';
import sortImg from "../assets/sort.svg";

export const SortPost = ({ postsList, getPosts, setSortPostFilter, sortPostFilter }: any) => {

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false);
    };
    const openModal = () => {
        setOpen(true);
    }
    return (
        <div className="wrapSort">
            <div className="sortContent">
                <img className="sortImg" src={sortImg} alt="Sort" />
                <h3 className='suggestions'> {postsList?.length} Suggestions</h3>
                <div className="sortBy">
                    <span>Sort by :</span>
                    <select className="select" defaultValue={sortPostFilter} onChange={(e) => setSortPostFilter(e.target.value)}  >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest </option>
                        <option value="mostComments">Most Comments</option>
                        <option value="leastComments">Least Comment</option>
                    </select>
                </div>
            </div>
            <button className="addFeedback" onClick={openModal}>+ Add Feedback</button>
            <CreateFeedback open={open} handleClose={handleClose} getPosts={getPosts} />
        </div>
    )
}
