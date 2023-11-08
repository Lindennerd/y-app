import { type QueryPostOutput } from "~/server/api/routers/post/types";
import { PostCard } from "../Card";

export interface PostsListProps {
  posts: QueryPostOutput[];
}

export const PostsList = (props: PostsListProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      {props.posts.map((post) => (
        <PostCard key={post?.id} post={post} />
      ))}
    </div>
  );
};
