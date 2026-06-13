import { HeroSection } from "./HeroSection";
import { SearchBar } from "../../ui/SearchBar";
import { PostList } from "../posts/PostList";
import { PostForm } from '../posts/PostForm';
import { Post } from "@/types/post";
import { Pagination } from "../posts/Pagination";
import { EmptyState } from "../posts/EmptyState";

type Props = {
  posts: Post[],
  query?: string,
  currentPage: number,
  totalPages: number,
  totalCount: number,
  currentUserId?: string
}

export async function HomePage({ posts, query, currentPage, totalPages, totalCount, currentUserId }: Props) {
  const hasPosts = posts.length > 0
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <HeroSection />
        <div className="mb-8">
          {currentUserId ? (
            <PostForm />
          ) : (
            <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">
              投稿するにはログインしてください。
            </div>
          )}
        </div>

        <SearchBar className="mb-8" />
        <div className="mb-4 text-sm text-muted-foreground">
          {query ? (
            <p>
              「{query}」の検索結果：{totalCount}件
            </p>
          ) : (
            <p>全{totalCount}件の投稿</p>
          )}
        </div>
        {!hasPosts ? (query ? (
          <EmptyState
            title="検索結果がありません"
            description={`「${query}」に一致する投稿はありませんでした。`}
            buttonText="検索をリセット"
            buttonHref="/"
          />
        ) : (
          <EmptyState />
        )
        ) : (
          <>
            <PostList posts={posts} currentUserId={currentUserId} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              query={query}
            />
          </>
        )}
      </section>
    </main>
  );
}