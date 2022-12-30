import CardContainer from "@components/Card/CardContainer";
import React from "react";

type RandomTeamProps = {
  isCardFlipped: boolean;
  teamOne: number[];
  teamTwo: number[];
};
function RandomTeam({ isCardFlipped, teamOne, teamTwo }: RandomTeamProps) {
  return (
    <div className="flex gap-8 flex-col lg:flex-row justify-center">
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
  );
}

export default RandomTeam;
