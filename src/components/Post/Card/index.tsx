import Link from "next/link";
import { type QueryPostOutput } from "~/server/api/routers/post/types";
import { PostCardActions } from "./Actions";
import { PostCardAuthor } from "./PostCardAuthor";
import { PostReferences } from "./PostReferences";

export interface PostCardProps {
  post: QueryPostOutput;
}

export const PostCard = (props: PostCardProps) => {
  if (!props.post) return <></>;
  return (
    <div className="border-primary-200 rounded border">
      <div className="flex flex-col gap-1">
        <Link
          className="w-full cursor-pointer py-2 text-center text-xl font-bold hover:underline"
          href={`/post/${props.post.id}`}
        >
          {props.post?.title}
        </Link>
        <div className="w-full text-center text-xl font-thin">
          {props.post.subtitle}
        </div>
        <div className="mt-2 p-4 text-justify">{props.post?.body}</div>
        <div className="border-primary-200 flex justify-between border p-2">
          <PostReferences references={props.post.references} />
          <PostCardAuthor post={props.post} />
        </div>
        <PostCardActions post={props.post} />
      </div>
    </div>
  );
};
