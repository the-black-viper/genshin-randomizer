import Button from "@components/Button";
import React, { useState } from "react";

type ModeSelectionProps = {
  handleChangeMode: (numChars: 2 | 4 | 8) => void;
};
function ModeSelection({ handleChangeMode }: ModeSelectionProps) {
  const [selectedButton, setSelectedButton] = useState(1);
  return (
    <div className="flex flex-col items-center gap-4 w-full xs:justify-center xs:flex-row my-4">
      <div tabIndex={1} role="button" onClick={() => setSelectedButton(1)}>
        <Button
          isPrimary={false}
          label={"Default"}
          onClick={() => handleChangeMode(8)}
          isClicked={selectedButton === 1}
        />
      </div>
      <div tabIndex={2} role="button" onClick={() => setSelectedButton(2)}>
        <Button
          isPrimary={false}
          label={"Tag Team"}
          onClick={() => handleChangeMode(4)}
          isClicked={selectedButton === 2}
        />
      </div>
      <div tabIndex={3} role="button" onClick={() => setSelectedButton(3)}>
        <Button
          isPrimary={false}
          label={"One-man Army"}
          onClick={() => handleChangeMode(2)}
          isClicked={selectedButton === 3}
        />
      </div>
    </div>
  );
}

export default ModeSelection;
