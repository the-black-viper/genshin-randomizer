"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import defaultCardBack from "../public/img/etc/default_card.png";
import "@styles/globals.css";
import { CharacterContext } from "context/CharacterContext";

export type ICharacterData = {
  id: number;
  fullName: string;
  imgName: string;
  rarity: number;
  elements: string[];
  selected: boolean;
  collab: boolean;
};
type ICharacter = {
  characterData: ICharacterData;
  isTeamCard: boolean;
  isCardFlipped?: boolean;
};

const baseStyle =
  "h-full w-full relative transition-transform duration-[500ms] transform3d-preserve perspective-800";
const cardBaseStyle =
  "flex justify-center items-center h-full w-full  rounded-xl shadow-lg absolute backface-hidden";

const cardBackStyle =
  "flex flex-col justify-start items-center h-full w-full rounded-xl shadow-lg absolute backface-hidden border-5 border-stone-900 rotate-y-180";

const ssrGradient = " bg-gradient-to-br from-amber-800 to-yellow-600";
const srGradient = " bg-gradient-to-br from-purple-900 to-purple-400";

const CharacterCard = ({
  isCardFlipped,
  isTeamCard,
  characterData,
}: ICharacter) => {
  const [{ excludedCharacterIds }, dispatch] = useContext(CharacterContext);
  const [clicked, setClicked] = useState(false);

  const handleClick = (char: ICharacterData) => {
    if (!clicked) {
      dispatch("excludeCharacter", char.id);
      setClicked(true);
    } else {
      dispatch("includeCharacter", char.id);
      setClicked(false);
    }
  };

  return (
    <div
      id="card-container"
      className={
        excludedCharacterIds.includes(characterData.id) && !isTeamCard
          ? "h-[157px] w-[120px] cursor-pointer brightness-50"
          : "h-[157px] w-[120px] cursor-pointer"
      }
    >
      <div
        tabIndex={1}
        className={isCardFlipped ? baseStyle + " rotate-y-180" : baseStyle}
        onClick={() => handleClick(characterData)}
      >
        <div id="front" className={cardBaseStyle}>
          <Image
            src={defaultCardBack}
            alt="default card back"
            priority={true}
            width={120}
            height={160}
            style={{ borderRadius: "10px", border: "5px solid rgb(28,25,23)" }}
          />
        </div>
        <div
          id="back"
          className={
            characterData.rarity === 4
              ? cardBackStyle + srGradient
              : cardBackStyle + ssrGradient
          }
        >
          <Image
            src={`/img/characters/${characterData.imgName}.webp`}
            alt={characterData.imgName}
            priority={true}
            width={256}
            height={256}
          />
          <div className="bg-stone-900 flex items-center text-sm justify-center text-center pt-2 pb-1 w-full h-full truncate break-words whitespace-normal leading-none">
            {characterData.fullName ? `${characterData.fullName}` : "Character"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
