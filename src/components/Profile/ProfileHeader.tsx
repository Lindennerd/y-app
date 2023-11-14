import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type ProfileQuery } from "~/server/api/routers/user";
import { Button } from "../base";

export const ProfileHeader = (profile: ProfileQuery) => {
  const { data: session } = useSession();

  if (!profile) return <></>;

  return (
    <div className="border-primary-200 flex w-full justify-between rounded border bg-white p-4">
      <Image
        alt="profile image"
        src={profile.image ?? ""}
        width={150}
        height={150}
        className="rounded-full"
      />
      <div>
        <div className="text-2xl font-bold">{profile.name}</div>
        <div className="text-lg font-thin">{profile.email}</div>
        <div className="mt-4 flex space-x-3 font-thin">
          <Link
            className="hover:underline"
            href={`/profile/followers/${profile.email}`}
          >{`Seguidores ${profile.followers.length}`}</Link>
          <Link
            className="hover:underline"
            href={`/profile/following/${profile.email}`}
          >{`Seguindo ${profile.following.length}`}</Link>
        </div>
        {session?.user.email !== profile.email && (
          <Button className="mt-4">Seguir</Button>
        )}
      </div>
    </div>
  );
};
