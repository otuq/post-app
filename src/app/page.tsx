
import { prisma } from "@/lib/prisma";
import { HomePage } from "./components/features/home/HomePage";
import { auth } from "../../auth";

type Props = {
  searchParams: Promise<{
    q?: string,
    page?: string
  }>
}

const PAGE_SIZE = 6

export default async function Home({ searchParams }: Props) {
  const { q: rawQ, page } = await searchParams
  const q = rawQ?.trim() || undefined
  const rawPage = Number(page ?? "1");
  const currentPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
  const skip = (currentPage - 1) * PAGE_SIZE;
  const where = q ? {
    OR: [
      { title: { contains: q, mode: "insensitive" as const } },
      { content: { contains: q, mode: "insensitive" as const } }
    ]
  } : undefined

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }

    }),
    prisma.post.count({
      where
    })
  ])
  const totalPage = Math.ceil(totalCount / PAGE_SIZE)
  const session = await auth()
  const currentUser = session?.user?.email ? await prisma.user.findUnique({
    where: { email: session?.user?.email },
    select: { id: true }
  }) : null

  return (
    <HomePage
      posts={posts}
      query={q}
      currentPage={currentPage}
      totalPages={totalPage}
      totalCount={totalCount}
      currentUserId={currentUser?.id}
    />
  )
}