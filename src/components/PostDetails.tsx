import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';

import { doc, updateDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import { useUserAuth } from '../context/UserAuthContext';
import { Post } from './Post';
import { Comment } from './Comment';

export const PostDetails = ({ post, openDetails, handleClose, getPosts }: any) => {
    //select good doc to update
    const docRef = doc(db, "posts", post.id);
    const { user } = useUserAuth();
    const [dataPost, setDataPost] = useState(post);
    const [comment, setComment] = useState("")

    const addComment = async () => {
        let newArray = [];
        const commentObj = {
            message: comment,
            username: user?.displayName,
            email: user?.email
        }
        newArray.push(commentObj)
        await updateDoc(docRef, {
            comments: dataPost.comments.concat(newArray)
        })
        //update post list
        setDataPost({ ...post, comments: dataPost.comments.concat(newArray) })
        setComment("")
    }

    const deleteComment = async (comment: any) => {
        let newArray = dataPost.comments;
        const indexToDelete = dataPost.comments.indexOf(comment);
        newArray.splice(indexToDelete, 1);
        await updateDoc(docRef, {
            comments: newArray
        })
        //update post list
        setDataPost({ ...post, comments: newArray })
        setComment("")
    }
    const goBack = () => {
        //toFix
        getPosts()
    }
    return (
        <Dialog fullScreen PaperProps={{ classes: { root: "dialogDetails" } }} onClose={handleClose} open={openDetails}>
            <div className="wrapForm">
                <p className='goBack' onClick={() => goBack()}> {"<"} Go Back </p>
                <Post post={dataPost} getPosts={getPosts} showModal={false} />
                {dataPost.comments?.length ? <div className="wrapComments">
                    <h2 className='commentTitle' > {dataPost.comments?.length} {dataPost.comments?.length > 1 ? "Comments" : "Comment"} </h2>
                    {dataPost.comments.map((comment: any, index: number) => (
                        <Comment key={index} user={user} message={comment.message} username={comment.username} deleteComment={deleteComment} comment=
                            {comment} />
                    ))}
                </div> : <span>{""}</span>}

                <div className="addCommentBox">
                    <h2 className='commentTitle' > Add Comment </h2>
                    <textarea
                        placeholder='Type your comment here'
                        className="formTextarea textareaComment"
                        rows={5}
                        cols={33}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="addComment addFeedback" onClick={() => addComment()}>Add a comment</button>
                </div>
            </div>
        </Dialog>
    )
}


