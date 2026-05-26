import { Post } from "@/types/post"

type Props = {
    post: Post
}

export function PostCard({ post }: Props) {
    return (
        <article className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-2 font-bold">{post.title}</h2>
            <p className="text-sm text-zinc-600">
                {post.body}
            </p>
        </article>
    )
}