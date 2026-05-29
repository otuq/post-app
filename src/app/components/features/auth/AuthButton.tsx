// src/components/features/auth/AuthButton.tsx

import { auth, signIn, signOut } from "../../../../../auth";
import { Button } from "@/components/ui/button";

export async function AuthButton() {
    const session = await auth();

    if (!session?.user) {
        return (
            <form
                action={async () => {
                    "use server";
                    await signIn();
                }}
            >
                <Button type="submit">ログイン</Button>
            </form>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
                {session.user.name ?? session.user.email}
            </span>

            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <Button type="submit" variant="outline">
                    ログアウト
                </Button>
            </form>
        </div>
    );
}