"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "../../auth"
import { redirect } from "next/navigation"

export async function deletePost(postId: string) {
    const session = await auth()

    if (!session?.user?.email) {
        throw new Error("ログインが必要です。")
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    if (!user) {
        throw new Error("ユーザーが見つかりません。")
    }

    const post = await prisma.post.findUnique({
        where: { id: postId }
    })

    if (!post || user.id !== post.authorId) {
        throw new Error("この投稿を操作する権限がありません。")
    }

    await prisma.post.delete({
        where: {
            id: postId,
        }
    })
    revalidatePath("/")
    redirect("/")
}