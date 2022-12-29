"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import defaultCardBack from "../public/img/etc/default_card.png";
import "@styles/globals.css";
import { CharacterContext } from "context/CharacterContext";
import { elements } from "@utils/constants";

export type ICharacterElements = typeof elements[number];
export type ICharacterData = {
  id: number;
  fullName: string;
  imgName: string;
  rarity: number;
  elements: ICharacterElements;
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

const cardFrontStyle =
  "flex relative flex-col justify-start items-center h-full w-full rounded-xl shadow-lg absolute backface-hidden   rotate-y-180";

const ssrGradient = " bg-gradient-to-br from-amber-800 to-yellow-600";
const srGradient = " bg-gradient-to-br from-purple-900 to-purple-400";
const labelStyle =
  "flex items-center text-sm justify-center text-center p-1 w-full h-full truncate break-words whitespace-normal leading-none font-bold rounded-b-xl";

const CharacterCard = ({
  isCardFlipped,
  isTeamCard,
  characterData,
}: ICharacter) => {
  const [{ excludedCharacterIds }, dispatch] = useContext(CharacterContext);
  const [clicked, setClicked] = useState(false);

  const handleClick = (char: ICharacterData) => {
    if (!clicked && excludedCharacterIds.includes(char.id)) {
      dispatch("includeCharacter", char.id);
      setClicked(true);
    }
    if (!clicked && !excludedCharacterIds.includes(char.id)) {
      dispatch("excludeCharacter", char.id);
      setClicked(true);
    }
    if (clicked && excludedCharacterIds.includes(char.id)) {
      dispatch("includeCharacter", char.id);
      setClicked(false);
    }
    if (clicked && !excludedCharacterIds.includes(char.id)) {
      dispatch("excludeCharacter", char.id);
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
        <div id="back" className={cardBaseStyle}>
          <Image
            src={defaultCardBack}
            alt="default card back"
            priority={true}
            width={120}
            height={160}
            style={{ borderRadius: "12px", border: "5px solid #a09073" }}
          />
        </div>
        <div
          id="front"
          className={
            characterData.rarity === 4
              ? cardFrontStyle + srGradient
              : cardFrontStyle + ssrGradient
          }
        >
          <div>
            <Image
              src={
                characterData.fullName === "Traveler"
                  ? `/img/elements/stardust.webp`
                  : `/img/elements/${characterData.elements}.svg`
              }
              alt={characterData.imgName}
              priority={true}
              width={25}
              height={20}
              style={{
                position: "absolute",
                top: "5px",
                left: "5px",
                filter: "drop-shadow(0 1px 1px black)",
              }}
            />
          </div>
          <Image
            src={`/img/characters/${characterData.imgName}.webp`}
            alt={characterData.imgName}
            priority={true}
            width={256}
            height={256}
          />
          <div
            className={
              characterData.rarity === 4
                ? labelStyle + " bg-violet-900"
                : labelStyle + " bg-yellow-700"
            }
          >
            {characterData.fullName ? `${characterData.fullName}` : "Character"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
