"use server"

import { prisma } from "@/lib/prisma"
import { postScheme } from "@/lib/validations/post"
import { revalidatePath } from "next/cache"
import { auth } from "../../auth"
import { ActionResult } from "@/types/action"

export async function createPost(formdata: FormData): Promise<ActionResult> {
    try {
        const session = await auth()
        if (!session?.user?.email) {
            return {
                success: false,
                message: "ログインが必要です。"
            }
        }
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return {
                success: false,
                message: "ユーザーが見つかりません。"
            }
        }

        const values = {
            title: String(formdata.get("title") ?? ""),
            content: String(formdata.get("content") ?? "")
        }
        const validateFields = postScheme.safeParse(values)

        if (!validateFields.success) {
            return {
                success: false,
                message: "入力内容が正しくありません。"
            }
        }

        await prisma.post.create({
            data: {
                ...validateFields.data,
                authorId: user.id,
            },
        });
        revalidatePath("/")
        revalidatePath("/me")
        return {
            success: true,
            message: "投稿に成功しました。"
        }

    } catch (error) {
        return {
            success: false,
            message: "投稿中にエラーが発生しました。"
        }
    }
}