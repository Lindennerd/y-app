import { type Comment } from "@prisma/client";
import { FaComment } from "react-icons/fa";
import { ButtonAction } from "./ButtonAction";

export interface CommentProps {
  comments: Comment[];
}

export const CommentButton = (props: CommentProps) => {
  return (
    <ButtonAction>
      <FaComment className="mt-1" />
      <span>{props.comments.length}</span>
    </ButtonAction>
  );
};
