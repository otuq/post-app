"use server"

import { prisma } from "@/lib/prisma"
import { postScheme } from "@/lib/validations/post"
import { revalidatePath } from "next/cache"
import { auth } from "../../auth"
import { ActionResult } from "@/types/action"

export async function updatePost(postId: string, formData: FormData): Promise<ActionResult> {
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

        const values = {
            title: String(formData.get("title") ?? ""),
            content: String(formData.get("content") ?? "")
        }

        const result = postScheme.safeParse(values)

        if (!result.success) {
            return {
                success: false,
                message: "入力内容を確認してください。"
            }
        }

        await prisma.post.update({
            where: { id: postId },
            data: result.data
        })
        revalidatePath("/")
        revalidatePath("/me")
        revalidatePath(`/posts/${postId}`);

        return {
            success: true,
            message: "投稿を更新しました。"
        }
    } catch (error) {
        return {
            success: false,
            message: "更新中にエラーが発生しました。"
        }
    }
}