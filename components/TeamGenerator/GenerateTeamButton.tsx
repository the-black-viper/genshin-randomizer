import Button from "@components/Button";
import React from "react";
type GenerateTeamButtonProps = { handleGenerateTeam: () => void };
function GenerateTeamButton({ handleGenerateTeam }: GenerateTeamButtonProps) {
  return (
    <div className="flex justify-center gap-4">
      <Button
        onClick={handleGenerateTeam}
        isPrimary={true}
        label={"Generate Team"}
      />
    </div>
  );
}

export default GenerateTeamButton;
