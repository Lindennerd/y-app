import Head from "next/head";
import { useParams } from "next/navigation";
import { PostsList } from "~/components/Post";
import { ProfileHeader } from "~/components/Profile/ProfileHeader";
import { LoadingSkeleton } from "~/components/base/LoadingSkeleton";
import { api } from "~/utils/api";

export default function ProfilePage() {
  const params = useParams<{ email: string }>();
  const { data: profile, isLoading } = api.user.getProfile.useInfiniteQuery({
    email: params?.email,
    limit: 10,
  });

  if (isLoading) return <LoadingSkeleton />;

  return (
    <>
      <Head>
        <title>Y - perfil de {params.email}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        {profile?.pages.length &&
          profile.pages.map((page) => {
            if (!page) return null;
            return (
              <div key={page.id} className="flex flex-col gap-2">
                <ProfileHeader {...page} />
                <PostsList posts={page.posts} />
              </div>
            );
          })}
      </div>
    </>
  );
}
