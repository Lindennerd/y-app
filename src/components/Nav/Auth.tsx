import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../base";

export const Auth = () => {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  if (!session)
    return (
      <>
        <Button onClick={() => signIn("auth0")}>Login</Button>
      </>
    );

  return (
    <>
      <Image
        onClick={() => setShowMenu(!showMenu)}
        className="border-primary-600 cursor-pointer rounded-full border-2"
        src={session.user.image!}
        alt="Profile"
        width={42}
        height={42}
      />

      <div
        className={`bg-primary-800 border-primary-600 absolute right-0 top-0 mr-2 mt-14 rounded-md border-2 transition-all ease-in-out ${
          showMenu ? "block" : "hidden"
        }`}
      >
        <ul className="flex w-24 flex-col text-white">
          <li className="hover:bg-primary-700 cursor-pointer px-4 py-2">
            <a className="cursor-pointer" onClick={() => signOut()}>
              Sair
            </a>
          </li>
          <li className="hover:bg-primary-700 cursor-pointer px-4 py-2">
            <a className="cursor-pointer" onClick={() => signOut()}>
              Sair
            </a>
          </li>
          <li className="hover:bg-primary-700 cursor-pointer px-4 py-2">
            <a onClick={() => signOut()}>Sair</a>
          </li>
        </ul>
      </div>
    </>
  );
};
