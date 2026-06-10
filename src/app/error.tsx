"use client"

import { Button } from "@/components/ui/button"

type Props = {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({
    error,
    reset,
}: Props) {
    console.error(error)

    return (
        <main className="flex min-h-screen items-center justify-center px-4">
            <div className="max-w-md text-center">
                <h1 className="text-2xl font-semibold">
                    エラーが発生しました
                </h1>

                <p className="mt-2 text-muted-foreground">
                    しばらくしてから再度お試しください。
                </p>

                <Button
                    className="mt-6"
                    onClick={() => reset()}
                >
                    再試行
                </Button>
            </div>
        </main>
    )
}