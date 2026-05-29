
import { prisma } from "@/lib/prisma";
import HomePage from "./components/features/home/HomePage";

type Props = {
  searchParams: Promise<{
    q?: string,
    page?: string
  }>
}

const PAGE_SIZE = 6

export default async function Home({ searchParams }: Props) {
  const { q, page } = await searchParams
  const rawPage = Number(page ?? "1");
  const currentPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
  const skip = (currentPage - 1) * PAGE_SIZE;
  const where = q ? {
    OR: [
      { title: { contains: q, mode: "insensitive" as const } },
      { body: { contains: q, mode: "insensitive" as const } }
    ]
  } : undefined

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip
    }),
    prisma.post.count({
      where
    })
  ])

  const totalPage = Math.ceil(totalCount / PAGE_SIZE)
  return (
    <HomePage
      posts={posts}
      query={q}
      currentPage={currentPage}
      totalPages={totalPage}
      totalCount={totalCount}
    />
  )
}