import * as React from "react";
import { PostsListEntry } from "../PostsListEntry/PostsListEntry";
import { Post } from "../../../domain/models/posts/post.model";


interface PostsSectionProps {
    posts: Post[]
}

export const PostsSection = (props: PostsSectionProps) => {

    const postsHtml = props.posts.map((post, idx) => {
        return (
            <li key={idx}>
                <PostsListEntry post={post}></PostsListEntry>
            </li>
        );
    });

    return (
        <div>
            <h1>Articles</h1>
            <ul className="posts-list">
                {postsHtml}
            </ul>
        </div>
    );
};
