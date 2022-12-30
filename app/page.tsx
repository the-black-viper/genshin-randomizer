import "@styles/globals.css";
import React from "react";
import Main from "@components/Main";
import CharacterSection from "@components/SelectionWrapper";
import Footer from "@components/Footer";

function HomePage() {
  return (
    <main className="bg-primary-bg-dark">
      <Main />
      <CharacterSection />
      <Footer />
    </main>
  );
}

export default HomePage;
