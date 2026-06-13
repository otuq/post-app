"use client"

import { deletePost } from "@/actions/deletePost"
import { useTransition } from "react"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Props = {
    postId: string
}

export function DeleteButton({ postId }: Props) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    function handleDelete() {
        startTransition(async () => {
            const result = await deletePost(postId)

            if (!result.success) {
                toast.error(result.message)
                return
            }

            toast.success(result.message)
            router.refresh()
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={isPending}
                    aria-label="投稿を削除"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        投稿を削除しますか？
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        この操作は取り消せません。削除すると投稿は完全に削除されます。
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        キャンセル
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={isPending}
                        onClick={handleDelete}
                    >
                        {isPending ? "削除中..." : "削除する"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}