import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { Button } from "../base";
import { Auth } from "./Auth";

export const Nav = () => {
  return (
    <nav className="from-primary-500 to-primary-700 sticky right-0 top-0 flex flex-wrap items-center justify-between bg-gradient-to-br px-6 shadow-sm">
      <div className="flex flex-shrink-0 items-center text-white">
        <Link href="/">
          <Image
            src={"/y-logo-2.png"}
            alt="Logo"
            width={62}
            height={62}
            priority
          />
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
