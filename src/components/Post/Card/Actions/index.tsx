import { type PostCardProps } from "../";
import { CommentButton } from "./Comment";
import { LikeButton } from "./Like";
import { ShareButton } from "./Share";

export const PostCardActions = (props: PostCardProps) => {
  if (!props.post) return <></>;
  return (
    <div className="flex justify-start gap-4 px-8">
      <LikeButton likes={props.post?.likes} postId={props.post.id} />
      <CommentButton comments={props.post?.comments} />
      <ShareButton />
    </div>
  );
};
