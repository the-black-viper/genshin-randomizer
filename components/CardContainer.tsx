"use client";
import React from "react";
import CharacterCard from "./Card";
import characterData from "utils/characterData.json";

function getCharacter(id: number) {
  const match = characterData.find((char) => {
    return char.id === id;
  });
  if (match) return match;
  // Return default object
  return characterData[0];
}

type IMultiTeam = {
  isMulti: boolean;
  teamIndex: number;
};

type ICardContainer = {
  isCardFlipped: boolean;
  teamIds: number[];
  isMultiTeam?: IMultiTeam;
};
function CardContainer({
  isCardFlipped,
  teamIds,
  isMultiTeam,
}: ICardContainer) {
  return (
    <div>
      <h5 className="text-center font-semibold text-xl my-3">{`${
        isMultiTeam ? "Team " + isMultiTeam.teamIndex : "Random Team"
      }`}</h5>
      <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-4">
        {teamIds.map((id: number, index: number) => {
          return (
            <CharacterCard
              key={
                isMultiTeam?.isMulti ? index * isMultiTeam?.teamIndex : index
              }
              isCardFlipped={isCardFlipped}
              isTeamCard={true}
              characterData={getCharacter(id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CardContainer;
