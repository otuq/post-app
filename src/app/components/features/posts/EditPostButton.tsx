"use client"

import { updatePost } from "@/actions/updatePost";
import { Post } from "@/types/post";
import { useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from "../../ui/input";

type Props = {
    post: Post
}

export function EditPostButton({ post }: Props) {
    const [isPending, startTransition] = useTransition()
    function handleSubmit(formData: FormData) {
        startTransition(async () => {
            await updatePost(post.id, formData)
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">編集</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>投稿を編集</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit} className="space-y-4">
                    <Input name="title" defaultValue={post.title} />
                    <textarea name="body" defaultValue={post.body}
                        className="min-h-32 w-full rounded-md border px-3 py-2 text-sm"
                    />
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "更新中..." : "更新するï"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )

}