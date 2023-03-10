"use client";
import React, { useContext, useMemo, useState } from "react";
import characterData from "@data/characterData.json";
import CharacterCard, { ICharacterElements } from "./Card/Card";
import { CharacterContext } from "context/CharacterContext";
import Image from "next/image";
import { getValidCharacters } from "@utils/helpers";
import Element from "./Element";
import { elements } from "@utils/constants";

const validCharacters = getValidCharacters();
const baseButton =
  "py-1 px-3 border-2 border-neutral-400 rounded-md font-bold shadow-md h-[35px]";

function filterCharactersList(query: string) {
  if (query === "") {
    return validCharacters;
  }
  const filteredCharacters = validCharacters.filter((char) => {
    if (char.fullName.toLowerCase().includes(query.toLowerCase())) {
      return char;
    }
  });
  return filteredCharacters;
}

const validElements = elements.filter(
  (element) => element !== "neutral" && element !== "paimon"
);
function CharacterSelection() {
  const [{ excludedCharacterIds }, dispatch] = useContext(CharacterContext);
  const [query, setQuery] = useState("");

  const handleClick = () => {
    if (excludedCharacterIds.length > 0) dispatch("selectAll");
    else dispatch("excludeAll");
  };
  const visibleCharacters = useMemo(() => filterCharactersList(query), [query]);

  return (
    <section
      id="character-selection"
      className="flex flex-col items-center justify-center h-auto w-screen"
    >
      <div className="flex">
        {validElements.map((element) => {
          return <Element element={element} key={element} />;
        })}
      </div>
      <div className="flex flex-col md:flex-row gap-4 my-4 items-center justify-center">
        <button
          className={
            excludedCharacterIds.length === validCharacters.length
              ? baseButton + " bg-white hover:bg-white text-black"
              : baseButton + " bg-gray-900 hover:bg-gray-800  text-white"
          }
          onClick={handleClick}
        >
          {excludedCharacterIds.length > 0 ? "Select All" : "Deselect All"}
        </button>
        <div className="flex gap-1 h-[35px] rounded-md border-2 border-neutral-400 bg-gray-900 py-1 px-2 drop-shadow-lg focus-within:shadow focus-within:shadow-slate-200 focus-within:drop-shadow-none">
          <div className="mr-2">
            <Image
              alt="search_icon"
              src={"/img/icons/search.svg"}
              width={20}
              height={20}
            />
          </div>
          <input
            type="text"
            name="character-search"
            id="character-search"
            className="bg-gray-900 border-none outline-none"
            placeholder="Search character"
            aria-label="search character"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 min-h-[500px]">
        {visibleCharacters.map((char) => {
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

export default CharacterSelection;
