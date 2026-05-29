"use server"

import { prisma } from "@/lib/prisma"
import { postScheme } from "@/lib/validations/post"
import { revalidatePath } from "next/cache"
import { auth } from "../../auth"
import { redirect } from "next/navigation"

export async function createPost(formdata: FormData) {

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

    const values = {
        title: String(formdata.get("title") ?? ""),
        content: String(formdata.get("content") ?? "")
    }
    const validateFields = postScheme.safeParse(values)

    if (!validateFields.success) {
        throw new Error("入力内容が正しくありません")
    }

    await prisma.post.create({
        data: {
            ...validateFields.data,
            authorId: user.id,
        },
    });
    revalidatePath("/")
    redirect("/")
}