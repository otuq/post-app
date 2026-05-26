import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";

export function SearchBar({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex gap-2", className)}{...props}>
            <Input placeholder="投稿を検索..." />
            <Button>検索</Button>
        </div>
    )
}