import { type Like } from "@prisma/client";
import { FaThumbsUp } from "react-icons/fa";
import { ButtonAction } from "./ButtonAction";

export interface LikeProps {
  likes: Like[];
}

export const LikeButton = (props: LikeProps) => {
  return (
    <ButtonAction>
      <FaThumbsUp className="mt-1" />
      <span>{props.likes.length}</span>
    </ButtonAction>
  );
};
