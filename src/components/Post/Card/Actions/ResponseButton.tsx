import { signIn, useSession } from "next-auth/react";
import { FaComment } from "react-icons/fa";
import { usePostForm } from "~/context/PostForm.Context";
import { ButtonAction } from "./ButtonAction";

export interface ResponseButtonProps {
  postId: number;
  postTitle: string;
  responses: { id: number }[];
}

export const ResponseButton = (props: ResponseButtonProps) => {
  const { setProps } = usePostForm();
  const { data: session } = useSession();

  async function handleReply() {
    if (!session?.user) await signIn("auth0");

    setProps({
      openModal: true,
      responseTo: {
        id: props.postId,
        title: props.postTitle,
      },
    });
  }

  return (
    <>
      <ButtonAction onClick={handleReply}>
        <FaComment className="mt-1" />
        <span>{props.responses.length}</span>
      </ButtonAction>
    </>
  );
};
