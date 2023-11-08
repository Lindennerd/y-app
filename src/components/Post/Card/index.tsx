import { type QueryPostOutput } from "~/server/api/routers/post/types";
import { PostCardActions } from "./Actions";
import { PostCardAuthor } from "./PostCardAuthor";

export interface PostCardProps {
  post: QueryPostOutput;
}

export const PostCard = (props: PostCardProps) => {
  if (!props.post) return <></>;
  return (
    <div className="border-primary-200 rounded border">
      <div className="flex flex-col gap-1">
        <div className="w-full py-2 text-center text-xl font-bold">
          {props.post?.title}
        </div>
        <div className="w-full text-center text-xl font-thin">subtitle</div>
        <div className="mt-2 p-4 text-justify">{props.post?.body}</div>
        <PostCardAuthor post={props.post} />
        <PostCardActions post={props.post} />
      </div>
    </div>
  );
};
