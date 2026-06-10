// src/components/features/auth/AuthButton.tsx

import { auth, signIn, signOut } from "../../../../../auth";
import { Button } from "@/components/ui/button";

export async function AuthButton() {
    const session = await auth();

    if (!session?.user) {
        return (
            <div className="flex gap-2">
                <form
                    action={async () => {
                        "use server";
                        await signIn("google");
                    }}
                >
                    <Button type="submit" variant="outline">
                        Googleでログイン
                    </Button>
                </form>

                <form
                    action={async () => {
                        "use server";
                        await signIn("github");
                    }}
                >
                    <Button type="submit" variant="outline">
                        GitHubでログイン
                    </Button>
                </form>
            </div>

        );
    }

    // return (
    //     <div className="flex items-center gap-3">
    //         <span className="text-sm text-muted-foreground">
    //             {session.user.name ?? session.user.email}
    //         </span>

    //         <form
    //             action={async () => {
    //                 "use server";
    //                 await signOut();
    //             }}
    //         >
    //             <Button type="submit" variant="outline">
    //                 ログアウト
    //             </Button>
    //         </form>
    //     </div>
    // );
}