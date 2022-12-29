"use client";
import React, { useContext, useMemo, useState } from "react";
import characterData from "@utils/characterData.json";
import CharacterCard from "./Card";
import { CharacterContext } from "context/CharacterContext";
import Image from "next/image";
import { getValidCharacters } from "@utils/helpers";

const validCharacters = getValidCharacters();
const baseRedButton =
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
function SelectionWrapper() {
  const [{ excludedCharacterIds }, dispatch] = useContext(CharacterContext);
  const [query, setQuery] = useState("");

  const handleClick = () => {
    if (excludedCharacterIds.length === validCharacters.length)
      dispatch("selectAll");
    else dispatch("excludeAll");
  };
  const visibleCharacters = useMemo(() => filterCharactersList(query), [query]);
  return (
    <section
      id="character-selection"
      className="flex flex-col items-center justify-center h-auto w-screen"
    >
      {/* <div>
        <div id="anemo-logo">
          <Image
            src={"/img/elements/anemo.svg"}
            alt="anemo_logo"
            width={40}
            height={40}
          />
        </div>
        <div id="hydro-logo"></div>
        <div id="pyro-logo"></div>
      </div> */}
      <div className="my-4 flex gap-4 items-center justify-center">
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
        <div className="flex gap-1 h-[35px] rounded-md border-2 border-neutral-400 bg-indigo-900 py-1 px-2 drop-shadow-lg focus-within:shadow focus-within:shadow-slate-200 focus-within:drop-shadow-none">
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
            className="bg-indigo-900 border-none outline-none"
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

export default SelectionWrapper;
