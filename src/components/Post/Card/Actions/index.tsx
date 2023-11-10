import { type PostCardProps } from "../";
import { LikeButton } from "./Like";
import { ResponseButton } from "./ResponseButton";
import { ShareButton } from "./Share";

export const PostCardActions = (props: PostCardProps) => {
  if (!props.post) return <></>;
  return (
    <div className="flex justify-start gap-4 px-8">
      <LikeButton likes={props.post?.likes} postId={props.post.id} />
      <ResponseButton
        responses={props.post?.responses}
        postId={props.post.id}
        postTitle={props.post.title}
      />
      <ShareButton />
    </div>
  );
};
