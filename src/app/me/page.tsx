import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { prisma } from "@/lib/prisma";
import { PostCard } from "../../components/ui/PostCard";
import { EmptyState } from "../../components/fetures/posts/EmptyState";

export default async function MyPostsPage() {
    const session = await auth()
    if (!session?.user?.email) {
        redirect("/")
    }
    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    })

    if (!currentUser) {
        redirect("/")
    }

    const posts = await prisma.post.findMany({
        where: {
            authorId: currentUser.id
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })

    return (
        <main className="mx-auto max-w-5xl px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">My Posts</h1>
                <p className="mt-2 text-sm text-zinc-500">
                    {currentUser.name ?? currentUser.email} さんの投稿一覧
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                    投稿数: {posts.length}件
                </p>
            </div>

            {posts.length === 0 ? (
                <EmptyState title={"まだ投稿がありません。"} />
            ) : (
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:${posts.length > 2 ? "grid-cols-3" : "grid-cols-2"} gap-6 space-y-4"`}>
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            currentUserId={currentUser.id}
                        />
                    ))}
                </div>
            )}
        </main>
    )
}