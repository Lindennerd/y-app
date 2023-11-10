import { LoadingSkeleton } from "~/components/base/LoadingSkeleton";
import { api } from "~/utils/api";
import { PostsList } from "../List";

export interface ResponseListProps {
  postId: number;
}

export const ResponseList = (props: ResponseListProps) => {
  const { data: responses, isLoading: isLoadingResponses } =
    api.post.getResponses.useQuery({ id: props.postId });

  if (isLoadingResponses) return <LoadingSkeleton />;
  if (!responses?.length)
    return (
      <div className="flex w-full justify-center">
        <h1>Nenhuma resposta para este post</h1>
      </div>
    );

  return (
    <>
      <div className="border-primary-200 mt-2 w-full border-b">
        <h1 className="p-2 text-xl font-bold">Respostas</h1>
      </div>
      {responses && <PostsList posts={responses} />}
    </>
  );
};
