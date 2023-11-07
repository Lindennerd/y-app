import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { Button } from "../base";
import { Auth } from "./Auth";

export const Nav = () => {
  return (
    <nav className="bg-primary-800 flex flex-wrap items-center justify-between px-6">
      <div className="flex flex-shrink-0 items-center text-white">
        <Link href="/">
          <Image src={"/y-logo-2.png"} alt="Logo" width={62} height={62} />
        </Link>
      </div>
      <div className="flex gap-2">
        <Button>
          <FaPlus />
        </Button>
        <Auth />
      </div>
    </nav>
  );
};
