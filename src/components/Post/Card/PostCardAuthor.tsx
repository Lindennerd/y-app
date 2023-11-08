import Image from "next/image";
import { type PostCardProps } from ".";

export const PostCardAuthor = (props: PostCardProps) => {
  if (!props.post) return <></>;
  return (
    <div className=" border-primary-200 flex flex-row justify-end gap-1 border-b border-t p-2">
      <div className="flex justify-center justify-items-center gap-4">
        <div className="flex flex-col">
          <span className="inline-block align-middle font-bold">
            {props.post?.createdBy.name}
          </span>
          <span className="text-gray-400">
            {props.post?.createdAt.toLocaleDateString()}
          </span>
        </div>
        {props.post.createdBy.image && (
          <Image
            src={props.post?.createdBy.image}
            alt="author image"
            className="rounded-full"
            width={45}
            height={45}
          />
        )}
      </div>
    </div>
  );
};
