export default function Loading() {
    return (
        <main className="min-h-screen">
            <section className="mx-auto max-w-5xl px-4 py-10">
                <div className="mb-8 space-y-3">
                    <div className="h-10 w-2/3 animate-pulse rounded-md bg-muted" />
                    <div className="h-5 w-full max-w-xl animate-pulse rounded-md bg-muted" />
                </div>

                <div className="mb-8 h-40 animate-pulse rounded-xl border bg-muted/40" />

                <div className="mb-8 h-10 animate-pulse rounded-md bg-muted" />

                <div className="grid gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-xl border p-5"
                        >
                            <div className="mb-3 h-5 w-2/3 animate-pulse rounded-md bg-muted" />
                            <div className="mb-2 h-4 w-full animate-pulse rounded-md bg-muted" />
                            <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted" />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}