"use client";
import React, { useContext, useEffect, useState } from "react";
import { generateRandomInteger, randChoice } from "utils/helpers";
import characterData from "utils/characterData.json";
import CardContainer from "./CardContainer";
import SelectionWrapper from "./SelectionWrapper";
import { CharacterContext } from "context/CharacterContext";
const defaultFourTeamIds = [-1, -2, -3, -4, -5, -6, -7, -8];
const totalChars = 8;
const validCharacters = characterData.slice(1);

function generateTeam(teamLength: number = 4, excludedIds: number[]): number[] {
  if (excludedIds.length === validCharacters.length) return defaultFourTeamIds;

  // Exclude index 0 (Default Character Object)
  const characterIds = validCharacters
    .slice(1)
    .map((char) => char.id)
    .filter((id) => !excludedIds.includes(id));
  const numSet: Set<number> = new Set();
  while (numSet.size !== teamLength) {
    const randomCharacterId = randChoice(characterIds);
    console.log(randomCharacterId);
    numSet.add(randomCharacterId);
  }

  return [...numSet];
}

function Content() {
  const [{ excludedCharacterIds }, _] = useContext(CharacterContext);
  const [teamIds, setTeamIds] = useState<number[]>(defaultFourTeamIds);
  const [isCardFlipped, setCardFlipped] = useState(false);

  const handleGenerateTeam = () => {
    if (!isCardFlipped) {
      const teamIds = generateTeam(totalChars, excludedCharacterIds);
      if (teamIds.toString() === defaultFourTeamIds.toString()) return;
      setTeamIds(teamIds);
      setCardFlipped(true);
    } else {
      setCardFlipped(false);
      // Add a delay for the animation to play
      setTimeout(() => {
        const teamIds = generateTeam(totalChars, excludedCharacterIds);
        if (teamIds.toString() === defaultFourTeamIds.toString()) return;
        setTeamIds(teamIds);
        setCardFlipped(true);
      }, 650);
    }
  };

  // Get team one and team two
  const individualTeamLength = Math.round(teamIds.length / 2);
  const teamOne = teamIds.slice(0, individualTeamLength);
  const teamTwo = teamIds.slice(individualTeamLength);
  return (
    <section>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleGenerateTeam}
          className="py-1 px-3 bg-red-900 border-2 border-neutral-400 rounded-md mt-5 mb-4 font-bold shadow-md hover:bg-red-800"
        >
          {"Generate Team"}
        </button>
      </div>
      <div className="flex gap-8 flex-col lg:flex-row">
        <CardContainer
          isCardFlipped={isCardFlipped}
          teamIds={teamOne}
          isMultiTeam={{ isMulti: true, teamIndex: 1 }}
          key={"team-one"}
        />
        <CardContainer
          isCardFlipped={isCardFlipped}
          teamIds={teamTwo}
          isMultiTeam={{ isMulti: true, teamIndex: 2 }}
          key={"team-two"}
        />
      </div>
    </section>
  );
}

export default Content;
