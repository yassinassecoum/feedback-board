
import { db } from '../config/firebase';
import { addDoc, collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";

import upImg from "../assets/up.svg";
import downImg from "../assets/down.svg";
import commentImg from "../assets/comment.svg";
import { IPost } from './main';
import { PostDetails } from './PostDetails';
import "../styles/post.css";

interface Props {
    post: IPost,
    showModal: boolean,
    getPosts: Function
}
interface Like {
    likeId: string;
    userId: string;
}
export const Post = (props: Props) => {
    const { post, showModal, getPosts } = props;
    const { user } = useUserAuth();
    const [likes, setLikes] = useState<Like[] | null>(null);

    const likesRef = collection(db, "likes");
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })))
    }
    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id })
            if (user) {
                setLikes((prev) =>
                    prev ? [...prev, { userId: user?.uid, likeId: newDoc.id }] : [{ userId: user?.uid, likeId: newDoc.id }]
                )
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid));
            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id)

            await deleteDoc(likeToDelete)
            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeToDeleteData.docs[0].id)
                )
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getLikes()
    }, [])

    const [openDetails, setOpenDetails] = useState(false);
    const handleClose = () => {
        setOpenDetails(false)
    }

    const formatDate = (date: Date) => {
        const dateObject = new Date(date)
        return `${String(dateObject.getDate()).padStart(2, '0')}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
    }


    return (
        <div className='post'>
            <div className="left">
                <div className={hasUserLiked ? "likeWrap blue" : "likeWrap grey"} onClick={hasUserLiked ? removeLike : addLike}>
                    <img className="upvote" src={hasUserLiked ? downImg : upImg} alt="upvote" />
                    {likes && <span> {likes?.length} </span>}
                </div>
                <div onClick={showModal ? () => setOpenDetails(true) : () => console.log("no modal")} className="contentWrap">
                    <div className="userWrap">
                        <img className="avatarPost" src={`https://avatars.dicebear.com/api/human/${post.username}.svg`} alt="Avatar" />
                        <div>
                            <h4 className='userName'> {post.username}</h4>
                            <span className='date' > {formatDate(post.createdAt)} </span>
                        </div>
                    </div>
                    <h3 className='postTitle' > {post.title} </h3>
                    <p className="postDesc" > {post.description} </p>
                    <div className='category'> {post.category} </div>
                </div>
            </div>
            <div className="right">
                <img src={commentImg} alt="comments logo" />
                <p className='bold' > {post.comments?.length} </p>
            </div>
            {showModal ? <PostDetails getPosts={getPosts} post={post} openDetails={openDetails} handleClose={handleClose} /> : ""}
        </div>
    )
}
