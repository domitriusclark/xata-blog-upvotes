import { getXataClient, PostsRecord } from "@lib/xata.codegen";

import UpvoteButton from "./UpvoteButton";
import { revalidatePath } from "next/cache";

type Props = {
  post: PostsRecord;
  key: string;
};

export default function Post({ post }: Props) {
  async function incrementUpvote(postId: string) {
    "use server";
    const xata = getXataClient();

    await xata.db.Posts.update(postId, {
      upvotes: {
        $increment: 1,
      },
    });
  }
  return (
    <article className="w-full p-4 text-white border-2 rounded-lg border-slate-300 ">
      <h1 className="text-xl">{post.title}</h1>
      <p className="text-md">{post.text}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-sm text-white rounded-lg bg-slate-700"
          >
            {tag}
          </span>
        ))}
        <UpvoteButton
          postId={post.id}
          incrementUpvote={incrementUpvote}
          upvote={post.upvotes}
        />
      </div>
    </article>
  );
}
