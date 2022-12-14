

import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { User } from "./User";
import { SideHeader } from "./SideHeader";
import { FilterTag } from "./FilterTag";
import { Roadmap } from "./Roadmap";
import { PostList } from "./PostList";

import { db } from '../config/firebase';
export interface IPost {
    id: string;
    userId: string;
    title: string;
    description: string;
    username: string;
    createdAt: Date;
    category: string;
    likes: number;
    comments: Array<string>;
}

export const Main = () => {
    const [currentTag, setCurrentTag] = useState("All");
    const [sortPostFilter, setSortPostFilter] = useState("latest");
    const [postsList, setPostsList] = useState<IPost[] | null>(null)
    const [loading, setLoading] = useState(false);

    const postsRef = collection(db, "posts");

    const getPosts = async () => {
        setLoading(true)
        const data = await getDocs(postsRef);
        let newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]
        switch (sortPostFilter) {
            case 'latest':
                newData.sort((a: any, b: any) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                break;
            case 'oldest':
                newData.sort((a: any, b: any) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
                break;
            case 'mostComments':
                newData.sort((a: any, b: any) => b.comments?.length - a.comments?.length)
                break;
            case 'leastComments':
                newData.sort((a: any, b: any) => a.comments?.length - b.comments?.length)
                break;
            default:
                console.log(`test`);
        }
        if (currentTag !== "All") {
            const filteredData = newData.filter((doc) => doc.category === currentTag)
            setLoading(false)
            setPostsList(filteredData)
        } else {
            setLoading(false)
            setPostsList(newData)
        }
    }

    useEffect(() => {
        getPosts();
    }, [currentTag, sortPostFilter])

    return (
        <div className="main">
            <section className="mainWrap">
                <div className="sideContent">
                    <User />
                    <SideHeader />
                    <FilterTag setCurrentTag={setCurrentTag} currentTag={currentTag} />
                    <Roadmap />
                </div>
                <div className="mainContent">
                    <PostList postsList={postsList} sortPostFilter={sortPostFilter} setSortPostFilter={setSortPostFilter} getPosts={getPosts} loading={loading} />
                </div>
            </section>
        </div>
    )
}