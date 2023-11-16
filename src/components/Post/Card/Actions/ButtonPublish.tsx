import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { toast } from "react-toastify";
import { api } from "~/utils/api";

export const PublishButton = ({ postId }: { postId: number }) => {
  const utils = api.useUtils();
  const publishMutation = api.post.publishPost.useMutation({
    onSuccess: async () => {
      await utils.user.getProfile.invalidate();
    },
    onError: (error) => {
      toast.error(JSON.stringify(error.data));
    },
  });

  function handlePublishPost(
    event: React.SyntheticEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    event.preventDefault();
    publishMutation.mutate({ postId });
  }

  return (
    <button
      className="flex space-x-2 font-bold text-primary-500"
      onClick={handlePublishPost}
    >
      <span>Publicar</span>
      <FaArrowUp className="mt-1" />
    </button>
  );
};
