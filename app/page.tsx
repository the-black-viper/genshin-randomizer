import "@styles/globals.css";
import React from "react";
import Main from "@components/Main";
import CharacterSection from "@components/SelectionWrapper";

function HomePage() {
  return (
    <main className="bg-primary-bg-dark">
      <Main />
      <CharacterSection />
    </main>
  );
}

export default HomePage;
