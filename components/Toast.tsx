"use client";
import { toastInterval } from "@utils/constants";
import { ToastContext } from "context/ToastContext";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
const baseStyle =
  "flex gap-4 bg-amber-600 fixed p-3 pr-5 rounded-md bottom-4 left-3 items-center border-2 border-gray-900 transition-all duration-300";

function Toast() {
  const [{ showToast }, dispatch] = useContext(ToastContext);

  // Auto close toast
  useEffect(() => {
    const interval = setInterval(() => {
      if (showToast) {
        dispatch("showToast", false);
      }
    }, toastInterval);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, showToast]);
  const handleClose = () => {
    dispatch("showToast", false);
  };

  return (
    <div
      className={`${baseStyle} ${
        showToast ? "translate-x-0" : "translate-x-hide-toast"
      }`}
    >
      <Image
        src={"/img/icons/alert-triangle.svg"}
        alt="exclamation mark icon"
        width={30}
        height={30}
        // style={{ filter: "invert(100%)" }}
      />
      <span className="text-black font-bold">
        Insufficient selected characters
      </span>
      <button className="absolute top-1 right-1" onClick={handleClose}>
        <Image
          src={"/img/icons/close_xxs.svg"}
          alt="close-icon"
          width={10}
          height={10}
        />
      </button>
    </div>
  );
}

export default Toast;
