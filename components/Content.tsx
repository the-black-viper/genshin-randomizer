"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  getDefaultTeamIds,
  getValidCharacters,
  randChoice,
} from "utils/helpers";
import { CharacterContext } from "context/CharacterContext";
import { ToastContext } from "context/ToastContext";
import { defaultEightTeamIds } from "@utils/constants";
import ModeSelection from "./ModeSelection";
import Button from "./Button";
import GenerateTeamButton from "./TeamGenerator/GenerateTeamButton";
import RandomTeam from "./TeamGenerator/RandomTeam";

const validCharacters = getValidCharacters();
function generateTeam(teamLength: number = 8, excludedIds: number[]): number[] {
  if (excludedIds.length === validCharacters.length) return defaultEightTeamIds;

  const characterIds = validCharacters
    .map((char) => char.id)
    .filter((id) => !excludedIds.includes(id));
  // If not enough characters to generate both teams return default ids
  if (characterIds.length < teamLength) {
    return defaultEightTeamIds;
  }
  const numSet: Set<number> = new Set();
  while (numSet.size !== teamLength) {
    const randomCharacterId = randChoice(characterIds);
    numSet.add(randomCharacterId);
  }

  return [...numSet];
}

function Content() {
  const [{ excludedCharacterIds, numberOfCharacters }, charDispatch] =
    useContext(CharacterContext);
  const [toastState, dispatch] = useContext(ToastContext);
  const [teamIds, setTeamIds] = useState<number[]>(defaultEightTeamIds);
  const [isCardFlipped, setCardFlipped] = useState(false);

  const handleGenerateTeam = () => {
    const defaultTeamIds = getDefaultTeamIds(numberOfCharacters);
    if (!isCardFlipped) {
      const teamIds = generateTeam(numberOfCharacters, excludedCharacterIds);
      if (teamIds.toString() === defaultTeamIds.toString()) {
        dispatch("showToast", true);
        return;
      }
      setTeamIds(teamIds);
      setCardFlipped(true);
    } else {
      setCardFlipped(false);
      // Add a delay for the animation to play
      setTimeout(() => {
        const teamIds = generateTeam(numberOfCharacters, excludedCharacterIds);
        if (teamIds.toString() === defaultTeamIds.toString()) {
          dispatch("showToast", true);
          return;
        }
        setTeamIds(teamIds);
        setCardFlipped(true);
      }, 650);
    }
  };

  const handleChangeMode = (numChars: 2 | 4 | 8) => {
    charDispatch("setNumberOfCharacters", numChars);
  };
  // Get team one and team two
  const individualTeamLength = Math.round(teamIds.length / 2);
  const teamOne = teamIds.slice(0, individualTeamLength);
  const teamTwo = teamIds.slice(individualTeamLength);
  return (
    <section>
      <ModeSelection handleChangeMode={handleChangeMode} />
      <GenerateTeamButton handleGenerateTeam={handleGenerateTeam} />
      <RandomTeam
        isCardFlipped={isCardFlipped}
        teamOne={teamOne}
        teamTwo={teamTwo}
      />
    </section>
  );
}

export default Content;
