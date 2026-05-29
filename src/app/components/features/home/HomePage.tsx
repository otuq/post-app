import { HeroSection } from "./HeroSection";
import { SearchBar } from "../../ui/SearchBar";
import { PostList } from "../posts/PostList";
import { PostForm } from '../posts/PostForm';
import { Post } from "@/types/post";
import { Pagination } from "../posts/Pagination";

type Props = {
  posts: Post[],
  query?: string,
  currentPage: number,
  totalPages: number,
  totalCount: number
}

export default function HomePage({ posts, query, currentPage, totalPages, totalCount }: Props) {
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <HeroSection />
        <PostForm />
        <SearchBar className="mb-8" />
        <div className="mb-4 text-sm text-zinc-500">
          {query ? (
            <p>
              「{query}」の検索結果：{totalCount}件
            </p>
          ) : (
            <p>全{totalCount}件の投稿</p>
          )}
        </div>
        <PostList posts={posts} query={query} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          query={query}
        />
      </section>
    </main>
  );
}