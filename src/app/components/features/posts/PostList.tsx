import { Post } from "@/types/post";
import { EmptyState } from "./EmptyState";
import { PostCard } from "../../ui/PostCard";

type Props = {
    posts: Post[]
}

export function PostList({ posts }: Props) {
    return (
        posts.length === 0 ? (<EmptyState />) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))
                }
            </div>
        )
    )
}