"use client"

import { deletePost } from "@/actions/deletePost";
import { useTransition } from "react";
import { Button } from "../../ui/button";
import { Trash2 } from "lucide-react"

type Props = {
    postId: string
}

export function DeleteButton({ postId }: Props) {
    const [isPending, startTransition] = useTransition();
    function handleDelete() {
        const ok = window.confirm("この投稿を削除しますか")

        if (!ok) { return }

        startTransition(async () => {
            await deletePost(postId)
        })
    }

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={isPending}
            onClick={handleDelete}
            aria-label="投稿を削除"
        >
            <Trash2 className="h-4 w-4" />
        </Button>

    )
}