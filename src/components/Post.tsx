import { Post as PostInterface } from "../pages/main"
import { db } from '../config/firebase';
import { addDoc, collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useUserAuth } from "../context/UserAuthContext";
import { useEffect, useState } from "react";
interface Props {
    post: PostInterface
}
interface Like {
    likeId: string;
    userId: string;
}
export const Post = (props: Props) => {
    const { post } = props;
    const { user } = useUserAuth();

    const [likes, setLikes] = useState<Like[] | null>(null);

    const likesRef = collection(db, "likes");

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

    const hasUserLiked = likes?.find((like) => like.userId == user?.uid);

    useEffect(() => {
        getLikes()
    }, [])

    return (
        <div>
            <h3> {post.title} </h3>
            <p> {post.description} </p>
            <span> @{post.username} </span>
            <button onClick={hasUserLiked ? removeLike : addLike}>  {hasUserLiked ? "Dislike" : "LIKE"}  </button>
            {likes && <p>Likes : {likes?.length} </p>}
        </div>
    )
}
