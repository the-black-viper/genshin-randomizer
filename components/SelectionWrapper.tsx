"use client";
import React, { useContext } from "react";
import characterData from "@utils/characterData.json";
import CharacterCard from "./Card";
import { CharacterContext } from "context/CharacterContext";

const validCharacters = characterData.slice(1);
const baseRedButton =
  "py-1 px-3 border-2 border-neutral-400 rounded-md mt-5 mb-4 font-bold shadow-md";
function SelectionWrapper() {
  const [{ excludedCharacterIds }, dispatch] = useContext(CharacterContext);

  const handleClick = () => {
    if (excludedCharacterIds.length === validCharacters.length)
      dispatch("selectAll");
    else dispatch("excludeAll");
  };
  console.log("excludedids", excludedCharacterIds);
  console.log(
    "Excluded all",
    excludedCharacterIds.length === validCharacters.length
  );
  return (
    <section
      id="character-selection"
      className="flex flex-col items-center justify-center h-auto w-screen"
    >
      <button
        className={
          excludedCharacterIds.length === validCharacters.length
            ? baseRedButton + " bg-blue-900 hover:bg-blue-800"
            : baseRedButton + " bg-red-900 hover:bg-red-800"
        }
        onClick={handleClick}
      >
        {excludedCharacterIds.length === validCharacters.length
          ? "Select All"
          : "Deselect All"}
      </button>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
        {validCharacters.map((char) => {
          return (
            <CharacterCard
              key={char.fullName}
              characterData={char}
              isTeamCard={false}
              isCardFlipped={true}
            />
          );
        })}
      </div>
    </section>
  );
}

export default SelectionWrapper;
