"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../../ui/input";
import { createPost } from "@/actions/createPost";
import { PostInput, postScheme } from "@/lib/validations/post";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import Loading from "@/app/loading";

export function PostForm() {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<PostInput>({
        resolver: zodResolver(postScheme),
        defaultValues: {
            title: "",
            content: ""
        }
    })

    function onSubmit(values: PostInput) {
        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("content", values.content)
        startTransition(async () => {
            const result = await createPost(formData)
            if (!result.success) {
                toast.error(result.message)
                return
            }
            toast.success(result.message)
            reset()
            router.refresh()
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8 rounded-xl border p-5">
            <div className="space-y-4">
                <Input placeholder="タイトル" {...register("title")} />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.title.message}
                    </p>
                )}
                <textarea
                    placeholder="本文"
                    className="min-h-32 w-full rounded-md border px-3 py-2 text-sm" {...register("content")}
                />
                {errors.content && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.content?.message}
                    </p>
                )}
                <Button type="submit" disabled={isPending}>
                    {isPending ? "投稿中" : "投稿する"}
                </Button>
            </div>
        </form>
    );
}