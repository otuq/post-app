"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "../../auth"
import { ActionResult } from "@/types/action"

export async function deletePost(postId: string): Promise<ActionResult> {
    try {
        const session = await auth()
        if (!session?.user?.email) {
            return {
                success: false,
                message: "ログインが必要です。"
            }
        }

        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true }
        })

        if (!currentUser) {
            return {
                success: false,
                message: "ユーザーが見つかりません。"
            }
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { authorId: true }
        })

        if (!post) {
            return {
                success: false,
                message: "投稿が見つかりません。"
            }
        }
        if (currentUser.id !== post.authorId) {
            return {
                success: false,
                message: "この投稿を操作する権限がありません。"
            }
        }
        await prisma.post.delete({
            where: {
                id: postId,
            }
        })
        revalidatePath("/")
        revalidatePath("/me")
        revalidatePath(`/posts/${postId}`)

        return {
            success: true,
            message: "投稿を削除しました。"
        }
    } catch (error) {
        return {
            success: false,
            message: "削除中にエラーが発生しました。"
        }
    }
}