import type { Post } from "@/types/post";
import { EmptyState } from "./EmptyState";
import { PostCard } from "../../ui/PostCard";

type PostListProps = {
    posts: Post[];
    query?: string;
    currentUserId?: string
};

export function PostList({ posts, query, currentUserId }: PostListProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} currentUserId={currentUserId} />
            ))}
        </div>
    );
}