import React from 'react'
import { Post } from "../components/Post";
import { NoPost } from './NoPost';
import { SortPost } from './SortPost';

import HashLoader from "react-spinners/HashLoader";


export const PostList = ({ postsList, getPosts, loading, setSortPostFilter, sortPostFilter }: any) => {
    return (
        <>
            <SortPost postsList={postsList} getPosts={getPosts} sortPostFilter={sortPostFilter} setSortPostFilter={setSortPostFilter} />
            <div>
                {loading ? <HashLoader
                    loading={loading}
                    color="#4661e6"
                    size={70}
                    cssOverride={{
                        margin: 'auto'
                    }}
                    speedMultiplier={2.5}
                /> : postsList?.length ? postsList?.map((post: any, index: number) => (
                    <Post getPosts={getPosts} key={post.id} post={post} showModal={true} />
                )) : <NoPost getPosts={getPosts} />}
            </div>
        </>
    )
}
