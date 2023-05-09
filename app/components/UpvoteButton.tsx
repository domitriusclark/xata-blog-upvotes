"use client";
import useOptimistic from "@/hooks/useOptimistic";

type Props = {
  upvote: number;
  incrementUpvote: (postId: string) => Promise<void>;
  postId: string;
};

export default function UpvoteButton({
  incrementUpvote,
  postId,
  upvote,
}: Props) {
  const [optimisticUpvote, addOptimisticUpvote] = useOptimistic(
    upvote,
    (prev, number: number) => {
      console.log("Running optimistic", prev, number);
      return prev + number;
    }
  );

  return (
    <button
      className="p-4 text-white rounded-lg bg-slate-700"
      onClick={async () => {
        addOptimisticUpvote(1);
        await incrementUpvote(postId);
      }}
    >
      ⬆️ {optimisticUpvote}
    </button>
  );
}
