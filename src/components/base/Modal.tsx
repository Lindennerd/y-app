import { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";

export interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  toggle: (open: boolean) => void;
}

export const Modal = (props: ModalProps) => {
  const [isOpen, setIsOpen] = useState(props.open);

  useEffect(() => {
    setIsOpen(props.open);
  }, [props.open]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto transition-all ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={toggle}
    >
      <div
        className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className=" flex justify-end px-4 pt-2">
            <button
              className="hover:text-primary-700 text-primary-500 rounded-full p-2 hover:bg-gray-300"
              onClick={() => props.toggle(!open)}
            >
              <FaWindowClose />
            </button>
          </div>
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};
