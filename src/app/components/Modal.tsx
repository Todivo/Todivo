"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; //뒤 화면 스크롤 막기

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose} //바깥 클릭 시 닫기
    >
      <div
        role="dialog"
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-110 overflow-y-auto rounded-[40px] bg-white p-8"
        onClick={(e) => e.stopPropagation()} //안쪽 클릭은 닫히지 않게
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="cursor-pointer text-gray-400"
          >
            <IoClose className="size-6" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
export default Modal;
