import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { auth } from "../../../../auth"
import Link from "next/link"
import { EditPostButton } from "@/components/fetures/posts/EditPostButton"
import { DeleteButton } from "@/components/fetures/posts/DeleteButton"
import { Metadata } from "next"

type Props = {
    params: Promise<{
        id: string
    }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params

    const post = await prisma.post.findUnique({
        where: { id },
        select: {
            title: true,
            content: true,
        },
    })

    if (!post) {
        return {
            title: "投稿が見つかりません",
        }
    }

    return {
        title: post.title,
        description: post.content.slice(0, 120),
    }
}

export default async function PostDetailPage({ params }: Props) {
    const { id } = await params
    const session = await auth()

    const post = await prisma.post.findUnique({
        where: { id },
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

    if (!post) {
        notFound()
    }
    const isOwner = session?.user?.email === post.author.email

    return (
        <main className="mx-auto max-w-3xl px-4 py-10">
            <Link href="/" className="mb-6 inline-block text-sm underline">
                投稿一覧へ戻る
            </Link>

            <article className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="mb-6">

                    <div className="flex gap-5 space-y-5 text-sm text-muted-foreground">
                        <p>投稿者: {post.author?.name ?? "Unknown"}</p>
                        <p>
                            作成日:{" "}
                            {new Date(post.createdAt).toLocaleDateString("ja-JP")}
                        </p>
                        <p>
                            更新日:{" "}
                            {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
                        </p>
                    </div>
                    <h1 className="whitespace-pre-wrap wrap-break-word mb-3 text-3xl font-bold">{post.title}</h1>
                </div>

                <p className="whitespace-pre-wrap wrap-break-word text-foreground">{post.content}</p>

                {isOwner && (
                    <div className="mt-6 flex justify-end gap-2">
                        <EditPostButton post={post} />
                        <DeleteButton postId={post.id} />
                    </div>
                )}
            </article>
        </main>
    )
}