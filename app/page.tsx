import "@styles/globals.css";
import React from "react";
import Content from "@components/Content";
import SelectionWrapper from "@components/SelectionWrapper";

function HomePage() {
  return (
    <main className="bg-sky-900">
      <section className="w-screen md:h-screen flex flex-col items-center justify-center">
        <header>
          <h1 className="text-3xl font-extrabold">Genshin Impact Randomizer</h1>
        </header>
        <Content />
        <a
          href="#character-selection"
          className="py-1 px-3 bg-gray-900 border-2 border-gray-400 rounded-md mt-5 mb-4 font-bold shadow-md"
        >
          Character Selection
        </a>
      </section>
      <SelectionWrapper />
    </main>
  );
}

export default HomePage;
