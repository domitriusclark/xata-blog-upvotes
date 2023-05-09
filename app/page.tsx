import { getXataClient } from "@lib/xata.codegen";
import Post from "@/components/Post";

export default async function Home() {
  const xata = getXataClient();

  const posts = await xata.db.Posts.getAll();

  return (
    <main className="flex flex-col items-center justify-between min-h-screen gap-4 p-24">
      <h1 className="text-2xl">Posts</h1>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
}

export const dynamic = "force-dynamic";
