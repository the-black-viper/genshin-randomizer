import "@styles/globals.css";
import React from "react";
import Main from "@components/Main";
import CharacterSection from "@components/CharacterSelection";
import Footer from "@components/Footer";
import Toast from "@components/Toast";

function HomePage() {
  return (
    <main className="bg-primary-bg-dark relative flex flex-col items-center xs:items-start">
      <Main />
      <CharacterSection />
      <Footer />
      <Toast />
    </main>
  );
}

export default HomePage;
