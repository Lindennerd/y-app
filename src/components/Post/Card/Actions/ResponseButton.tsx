import { useState } from "react";
import { FaComment } from "react-icons/fa";
import { Modal } from "~/components/base";
import { PostForm } from "../../Form";
import { ButtonAction } from "./ButtonAction";

export interface ResponseButtonProps {
  postId: number;
  postTitle: string;
  responses: { id: number }[];
}

export const ResponseButton = (props: ResponseButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ButtonAction onClick={() => setOpen(!open)}>
        <FaComment className="mt-1" />
        <span>{props.responses.length}</span>
      </ButtonAction>
      <Modal open={open} toggle={(toggle) => setOpen(toggle)}>
        <PostForm responseTo={{ id: props.postId, title: props.postTitle }} />
      </Modal>
    </>
  );
};
