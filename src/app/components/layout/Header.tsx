import Link from "next/link";
import { AuthButton } from "../features/auth/AuthButton";
import { UserMenu } from "../features/auth/UserMenu";
import { ThemeToggle } from "@/components/fetures/theme/ThemeToggle";

export function Header() {
    return (
        <header className="border-b bg-background">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold">
                    Post App
                </Link>
                <nav className="flex items-center gap-3">
                    <ThemeToggle />
                    <UserMenu />
                </nav>
            </div>
        </header>
    );
}