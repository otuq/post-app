"use client"

import { updatePost } from "@/actions/updatePost";
import { Post } from "@/types/post";
import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from "../../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
    post: Post
}

export function EditPostButton({ post }: Props) {
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = await updatePost(post.id, formData)
            if (!result.success) {
                toast.error(result.message)
                return
            }
            setOpen(false)
            toast.success(result.message)
            router.refresh()
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">編集</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>投稿を編集</DialogTitle>
                </DialogHeader>
                <form action={handleSubmit} className="space-y-4">
                    <Input name="title" defaultValue={post.title} />
                    <textarea name="content" defaultValue={post.content}
                        className="min-h-32 w-full rounded-md border px-3 py-2 text-sm"
                    />
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "更新中..." : "更新する"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )

}