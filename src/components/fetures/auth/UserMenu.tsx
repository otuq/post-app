import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { auth, signIn, signOut } from "../../../../auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"


export async function UserMenu() {
    const session = await auth()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none select-none">
                {session?.user ? session.user.name ?? session.user.email : "account"}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {!session?.user ? (
                    <>
                        <DropdownMenuItem>
                            <form
                                action={async () => {
                                    "use server";
                                    await signIn("google");
                                }}
                            >
                                <button type="submit"   >
                                    Google Login
                                </button>
                            </form>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <form
                                action={async () => {
                                    "use server";
                                    await signIn("github");
                                }}
                            >
                                <button type="submit">
                                    Github Login
                                </button>
                            </form>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={"/me"}>My Post</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <form action={async () => {
                                "use server"
                                await signOut()
                            }}>
                                <button type="submit">Logout</button>
                            </form>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu >
    )
}