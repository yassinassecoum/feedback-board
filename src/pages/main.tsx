import { useNavigate } from "react-router-dom";
import { CreateFeedback } from "../components/CreateFeedback";
import { getDocs, collection } from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";

import { db } from '../config/firebase';
import { useEffect, useState } from "react";
import { Post } from "../components/Post";

export interface Post {
    id: string;
    userId: string;
    title: string;
    description: string;
    username: string;
    likes: number;
}

export const Main = () => {
    const [postsList, setPostsList] = useState<Post[] | null>(null)
    const postsRef = collection(db, "posts");
    const navigate = useNavigate();
    const { user, logOut } = useUserAuth();

    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[])
    }

    const signUserOut = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getPosts();
    }, [])
    return (
        <div>
            <h1>HomePage</h1>
            <p> Welcome {user?.displayName}  </p>
            <button onClick={signUserOut}>Log Out</button>
            <h1>Create feedback</h1>
            <CreateFeedback />
            <h2>All posts</h2>
            <div>
                {postsList?.map((post, index) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}