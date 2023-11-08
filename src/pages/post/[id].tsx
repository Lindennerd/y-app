import Head from "next/head";
import { useParams } from "next/navigation";
import { PostCard } from "~/components/Post/Card";
import { LoadingSkeleton } from "~/components/base/LoadingSkeleton";
import { api } from "~/utils/api";

export default function PostPage() {
  const { id } = useParams();
  const { data: post, isLoading } = api.post.getPost.useQuery({
    id: Number(id),
  });

  if (isLoading) return <LoadingSkeleton />;
  if (!post)
    return (
      <div className="flex justify-center">
        <h1>Post não encontrado</h1>
      </div>
    );
  return (
    <>
      <Head>
        <title>Y - {post.title}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostCard post={post} />
    </>
  );
}
