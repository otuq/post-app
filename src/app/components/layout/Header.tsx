import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
    return (
        <header className="border-b bg-white">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold">
                    Post App
                </Link>
                <nav className="flex items-center gap-3">
                    <Link href="/" className="text-sm text-muted-foreground">
                        投稿一覧
                    </Link>
                    <Button size="sm">ログイン</Button>
                </nav>
            </div>
        </header>
    );
}