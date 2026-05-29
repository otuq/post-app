"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { createPost } from "@/actions/createPost";
import { PostInput, postScheme } from "@/lib/validations/post";
import { useTransition } from "react";

export function PostForm() {
    const [isPending, startTransition] = useTransition()


    const { register, handleSubmit, reset, formState: { errors } } = useForm<PostInput>({
        resolver: zodResolver(postScheme),
        defaultValues: {
            title: "",
            body: ""
        }
    })

    function onSubmit(values: PostInput) {
        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("body", values.body)
        startTransition(async () => {
            await createPost(formData)
            reset()
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8 rounded-xl border bg-white p-5">
            <div className="space-y-4">
                <Input placeholder="タイトル" {...register("title")} />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.title.message}
                    </p>
                )}
                <textarea
                    placeholder="本文"
                    className="min-h-32 w-full rounded-md border px-3 py-2 text-sm" {...register("body")}
                />
                {errors.body && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.body.message}
                    </p>
                )}
                <Button type="submit" disabled={isPending}>
                    {isPending ? "投稿中" : "投稿する"}
                </Button>

            </div>
        </form>
    );
}