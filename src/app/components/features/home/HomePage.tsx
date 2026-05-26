import { dummyPosts } from "@/lib/dummyPosts";
import { HeroSection } from "./HeroSection";
import { SearchBar } from "../../ui/SearchBar";
import { PostList } from "../posts/PostList";

export default function HomePage() {
  const posts = dummyPosts
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <HeroSection />
        <SearchBar className="mb-8" />
        <PostList posts={posts} />
      </section>
    </main>
  );
}