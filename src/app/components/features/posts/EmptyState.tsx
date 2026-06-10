import Link from "next/link"
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react"

type EmptyStateProps = {
    title?: string
    description?: string
    buttonText?: string
    buttonHref?: string
}

export function EmptyState({
    title = "投稿がありません",
    description = "最初の投稿を作成してみましょう。",
    buttonText = "投稿を作成",
    buttonHref = "/",
}: EmptyStateProps) {
    return (
        <div className="rounded-xl border border-dashed p-10 text-center">
            <FileText className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
            <h2 className="text-lg font-semibold">{title}</h2>

            <p className="mt-2 text-sm text-foreground">{description}</p>

            <Button asChild className="mt-6">
                <Link href={buttonHref}>{buttonText}</Link>
            </Button>
        </div>
    )
}