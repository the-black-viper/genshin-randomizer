import "@styles/globals.css";
import React from "react";
import { generateRandomInteger } from "utils/helpers";
import characterData from "utils/characterData.json";
import CharacterCard from "@components/Card";

function generateTeam(teamLength: number = 4) {
  let teamIds: number[] = [];

  for (let i = 0; i < teamLength; i++) {
    const randomCharacterId = generateRandomInteger(1, characterData.length);
    teamIds.push(randomCharacterId);
  }
  console.log(teamIds);
  return teamIds;
}

function HomePage() {
  const teamIds = generateTeam();
  return (
    <main className="bg-slate-700 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <header className="text-xl">Genshin Team Generator</header>
      <h5>Team Ids</h5>
      <div className="flex justify-center gap-3.5">
        {teamIds.map((id: number) => {
          return <CharacterCard key={id} />;
        })}
      </div>
      {/* {teamIds.map((id: number) => {
        return <div key={id}>{id}</div>;
      })} */}
      {/* <CharacterCard /> */}
    </main>
  );
}

export default HomePage;
