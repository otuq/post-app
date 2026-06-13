import { DeleteButton } from '../fetures/posts/DeleteButton';
import { EditPostButton } from "../fetures/posts/EditPostButton";
import { Post } from "@/types/post"
import Link from "next/link";

type Props = {
    post: Post
    currentUserId?: string
}

export async function PostCard({ post, currentUserId }: Props) {
    const isOwner = currentUserId === post.authorId
    return (
        <article className="rounded-xl border bg-background p-5 shadow-sm min-w-0">
            <div className='flex'>
                <div className='flex lg:max-w-35'>
                    <span className="whitespace-nowrap text-sm text-muted-foreground">投稿者：</span>
                    <span className="lg:truncate text-sm text-muted-foreground">{post.author.name ?? "Unknown"}</span>
                </div>
                <div className='flex ml-5 lg:ml-auto'>
                    <span className="whitespace-nowrap text-sm text-muted-foreground">作成日：</span>
                    <span className="text-sm text-muted-foreground">{new Date(post.createdAt).toLocaleDateString("ja-JP")}</span>
                </div>
            </div>
            <h2 className="my-5 font-bold truncate">
                <Link
                    href={`/posts/${post.id}`}
                    className="hover:underline"
                >
                    {post.title}
                </Link>
            </h2>
            {isOwner &&
                (<div className="flex justify-end">
                    <EditPostButton post={post} />
                    <DeleteButton postId={post.id} />
                </div>)
            }
        </article>
    )
}
// export async function PostCard({ post, currentUserId }: Props) {
//     const isOwner = currentUserId === post.authorId
//     return (
//         <article className="rounded-xl border bg-white p-5 shadow-sm">
//             <h2 className="mb-2 font-bold">{post.title}</h2>
//             <p className="text-sm text-zinc-600">
//                 {post.content}
//             </p>
//             {isOwner &&
//                 (<div className="flex justify-end">
//                     <EditPostButton post={post} />
//                     <DeleteButton postId={post.id} />
//                 </div>)
//             }
//         </article>
//     )
// }