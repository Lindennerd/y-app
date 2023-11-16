import { useSession } from "next-auth/react";
import { type PostCardProps } from "../";
import { PublishButton } from "./ButtonPublish";
import { LikeButton } from "./Like";
import { ResponseButton } from "./ResponseButton";
import { ShareButton } from "./Share";

export const PostCardActions = (props: PostCardProps) => {
  const { data: session } = useSession();

  const showPublishButton =
    props.post &&
    props.post.draft &&
    session &&
    session.user.id === props.post.createdById;

  if (!props.post) return <></>;
  return (
    <div className="flex justify-between">
      <div className="flex justify-start gap-4 px-8">
        <LikeButton likes={props.post?.likes} postId={props.post.id} />
        <ResponseButton
          responses={props.post?.responses}
          postId={props.post.id}
          postTitle={props.post.title}
        />
        <ShareButton />
      </div>
      <div className="flex justify-end gap-4 px-8">
        {showPublishButton && <PublishButton postId={props.post.id} />}
      </div>
    </div>
  );
};
