"use client"

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar({ className, ...props }: React.ComponentProps<"div">) {
    const router = useRouter()
    const searchParams = useSearchParams()
    function handleSubmit(formData: FormData) {
        const q = formData.get("q")?.toString() ?? ""
        if (!q.trim()) {
            router.push("/")
            return
        }
        router.push(`/?q=${encodeURIComponent(q)}`)
    }

    return (
        <div className={cn("flex gap-2", className)}{...props}>
            <form action={handleSubmit} className="flex gap-2">
                <Input
                    name="q"
                    placeholder="投稿を検索..."
                    defaultValue={searchParams.get("q") ?? ""}
                />
                <Button type="submit">検索</Button>
            </form>
        </div>
    )
}