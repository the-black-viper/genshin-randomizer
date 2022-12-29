"use client";
import { getValidCharacters } from "@utils/helpers";
import { CharacterContext } from "context/CharacterContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import type { ICharacterElements } from "./Card";

const validCharacters = getValidCharacters();

const baseStyle =
  "bg-gray-900 p-2 flex items-center justify-center border-2 border-neutral-400 rounded-md";
type ElementButton = {
  element: ICharacterElements;
};
function Element({ element }: ElementButton) {
  const [{ excludedCharacterIds }, dispatch] = useContext(CharacterContext);
  const [clicked, toggleClick] = useState(false);
  const handleElementClick = (element: ICharacterElements) => {
    const elementIds = validCharacters
      .filter((char) => char.elements === element)
      .map((data) => data.id);
    if (!clicked) {
      const combinedExcludedIds = [...elementIds, ...excludedCharacterIds];
      // Get unique ids
      const uniqueExcludedIds = Array.from(new Set(combinedExcludedIds));
      dispatch("setExcludedCharacters", uniqueExcludedIds);
      toggleClick(true);
    } else {
      const newExcludedIds = excludedCharacterIds.filter(
        (id) => !elementIds.includes(id)
      );
      dispatch("setExcludedCharacters", newExcludedIds);
      toggleClick(false);
    }
  };
  const elementIds = validCharacters
    .filter((char) => char.elements === element)
    .map((data) => data.id);
  const isElementDisabled = elementIds.some((exId) =>
    excludedCharacterIds.includes(exId)
  );
  return (
    <button
      aria-label="select/deselect characters with element"
      className={isElementDisabled ? baseStyle + " brightness-50" : baseStyle}
      onClick={() => handleElementClick(element)}
    >
      <Image
        src={`/img/elements/${element}.svg`}
        alt={`${element}-logo`}
        width={30}
        height={30}
      />
    </button>
  );
}

export default Element;
