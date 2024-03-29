import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { usePostForm } from "~/context/PostForm.Context";
import { Button } from "../base";
import { Auth } from "./Auth";

export const Nav = () => {
  const { setProps } = usePostForm();

  function handleAddPost() {
    setProps({
      openModal: true,
    });
  }

  return (
    <nav className="sticky right-0 top-0 flex flex-wrap items-center justify-between bg-gradient-to-br from-primary-500 to-primary-700 px-6 shadow-sm">
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
        <Button className="mt-2" onClick={handleAddPost}>
          <FaPlus />
        </Button>
        <Auth />
      </div>
    </nav>
  );
};
