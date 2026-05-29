"use server"

import { prisma } from "@/lib/prisma"
import { postScheme } from "@/lib/validations/post"
import { revalidatePath } from "next/cache"
import { auth } from "../../auth"
import { redirect } from "next/navigation"

export async function updatePost(postId: string, formData: FormData) {
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

    const values = {
        title: String(formData.get("title") ?? ""),
        content: String(formData.get("content") ?? "")
    }

    const result = postScheme.safeParse(values)

    if (!result.success) { return }

    await prisma.post.update({
        where: { id: postId },
        data: result.data
    })
    revalidatePath("/")
    redirect("/")
}