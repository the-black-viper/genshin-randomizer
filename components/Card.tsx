"use client";
import React, { useState } from "react";
import Image from "next/image";
import defaultCardBack from "../public/img/etc/default_card.png";
import "@styles/globals.css";
const CharacterCard = () => {
  const [clicked, setClicked] = useState(false);

  const clickedStyle =
    "h-full w-full relative rotate-y-180 transition-transform duration-[800ms] transform3d-preserve";
  return (
    <div id="card-container" className="h-[160px] w-[120px]">
      <div
        tabIndex={1}
        onClick={() => setClicked(!clicked)}
        className={
          clicked
            ? clickedStyle
            : "h-full w-full relative transition-transform duration-1000 transform3d-preserve"
        }
      >
        <div
          id="front"
          className="h-full w-full rounded-2xl shadow-lg absolute backface-hidden"
        >
          <Image
            src={defaultCardBack}
            alt="default card back"
            width={120}
            height={160}
            style={{ borderRadius: "10px", border: "5px solid #a09073" }}
          />
        </div>
        <div
          id="back"
          className="h-full w-full bg-amber-600 rounded-lg shadow-lg absolute backface-hidden rotate-y-180"
        >
          Character
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
