import type { Post } from "@/types/post";
import { EmptyState } from "./EmptyState";
import { PostCard } from "../../ui/PostCard";

type PostListProps = {
    posts: Post[];
    query?: string;
};

export function PostList({ posts, query }: PostListProps) {
    if (posts.length === 0 && query) {
        return (
            <EmptyState
                title="検索結果がありません"
                description={`「${query}」に一致する投稿はありませんでした。`}
                buttonText="検索をリセット"
                buttonHref="/"
            />
        );
    }

    if (posts.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}