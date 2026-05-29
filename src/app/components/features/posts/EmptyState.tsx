import Link from "next/link";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
};

export function EmptyState({
    title = "投稿がありません",
    description = "最初の投稿を作成してみましょう。",
    buttonText = "投稿を作成",
    buttonHref = "/",
}: EmptyStateProps) {
    return (
        <div className="rounded-xl border border-dashed bg-white p-10 text-center">
            <h2 className="text-lg font-bold">{title}</h2>

            <p className="mt-2 text-sm text-zinc-500">{description}</p>

            <Button asChild className="mt-6">
                <Link href={buttonHref}>{buttonText}</Link>
            </Button>
        </div>
    );
}