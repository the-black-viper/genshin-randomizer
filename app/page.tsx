import "@styles/globals.css";
import React from "react";
import Content from "@components/Content";
import SelectionWrapper from "@components/SelectionWrapper";
import Image from "next/image";

function HomePage() {
  return (
    <main className="bg-primary-bg-dark">
      <section className="w-screen md:h-screen flex flex-col items-center justify-center">
        <header>
          <h1 className="text-4xl font-extrabold">Genshin Impact Randomizer</h1>
        </header>
        <Content />
        <a
          href="#character-selection"
          aria-label="navigation character selection"
          className="flex gap-1 py-1 px-3 bg-gray-900 border-2 border-gray-400 rounded-md mt-5 mb-4 font-bold shadow-md hover:bg-gray-800"
        >
          Character Selection
          <Image
            src={"/img/icons/double_chevron_down.svg"}
            width={18}
            height={20}
            alt="chevron_down"
          />
        </a>
      </section>
      <SelectionWrapper />
    </main>
  );
}

export default HomePage;
