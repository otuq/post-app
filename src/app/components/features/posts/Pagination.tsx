import Link from "next/link"
import { Button } from '@/components/ui/button';

type Props = {
    currentPage: number,
    totalPages: number,
    query?: string
}

export function Pagination({ currentPage, totalPages, query }: Props) {
    if (totalPages <= 1) { return null }
    const createPageHref = (page: number) => {
        const params = new URLSearchParams()
        params.set("page", String(page))
        if (query) {
            params.set("q", query)
        }
        return `?${params.toString()}`
    }
    return (
        <div className="mt-8 flex items-center justify-center gap-2">
            {currentPage > 1 && (<Button asChild variant="outline">
                <Link href={createPageHref(currentPage - 1)}>前へ</Link>
            </Button>)}

            {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1
                const isActive = page === currentPage
                return (
                    <Button
                        key={page}
                        asChild
                        variant={isActive ? "default" : "outline"}
                        size={"icon"}
                    >
                        <Link href={createPageHref(page)}>{page}</Link>
                    </Button>
                )
            })}
            {currentPage < totalPages && (<Button asChild variant="outline">
                <Link href={createPageHref(currentPage + 1)}>次へ</Link>
            </Button>)}
        </div>

    )
}