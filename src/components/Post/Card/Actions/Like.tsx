/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type Like } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import { FaThumbsUp } from "react-icons/fa";
import { POSTS_LIMIT } from "~/constants";
import { api } from "~/utils/api";
import { ButtonAction } from "./ButtonAction";

export interface LikeProps {
  likes: Like[];
  postId: number;
}

export const LikeButton = (props: LikeProps) => {
  const { data: session } = useSession();
  const utils = api.useUtils();

  const optimisticLike: Like = {
    id: Math.random() * 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
    postId: props.postId,
    userId: session?.user.id ?? "",
  };

  const { mutate: likeMutation } = api.like.like.useMutation({
    onMutate: () => {
      if (!session) return;
      utils.post.getPost.setData({ id: props.postId }, (data) => {
        if (!data) return data;
        if (data.likes.some((like) => like.userId === session.user.id))
          return {
            ...data,
            likes: data.likes.filter((like) => like.userId !== session.user.id),
          };

        return {
          ...data,
          likes: [...data.likes, optimisticLike],
        };
      });

      utils.post.getLatest.setInfiniteData({ limit: POSTS_LIMIT }, (data) => ({
        pageParams: data!.pageParams,
        pages: data!.pages.map((page) => {
          return {
            ...page,
            posts: page.posts.map((post) => {
              if (post.id === props.postId) {
                if (post.likes.some((like) => like.userId === session.user.id))
                  return {
                    ...post,
                    likes: post.likes.filter(
                      (like) => like.userId !== session.user.id,
                    ),
                  };

                return {
                  ...post,
                  likes: [...post.likes, optimisticLike],
                };
              }
              return post;
            }),
          };
        }),
      }));
    },
  });

  async function handleLike() {
    if (!session) {
      await signIn("auth0");
      return;
    }

    likeMutation({ postId: props.postId });
  }

  return (
    <ButtonAction onClick={handleLike}>
      <FaThumbsUp className="mt-1" />
      <span>{props.likes.length}</span>
    </ButtonAction>
  );
};
