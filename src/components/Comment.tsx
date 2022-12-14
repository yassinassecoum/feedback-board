import React from 'react'

export const Comment = ({ user, message, username, deleteComment, comment }: any) => {
    return (
        <>
            <div className="comment">
                <img className="avatar usernameAvatar" src={`https://avatars.dicebear.com/api/human/${username}.svg`} alt="Avatar" />
                <div className="commentContent">
                    <span className='commentUsername' > {username} </span>
                    <p className="commentMsg" > {message} </p>
                </div>
                {user?.email === comment.email ? <span onClick={() => deleteComment(comment)}>X</span> : ""}
            </div>
            <hr />
        </>
    )
}
