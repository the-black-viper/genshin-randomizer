import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <footer className="flex flex-col items-center p-5">
      <div className="flex flex-col items-center text-center">
        <p>Genshin Randomizer is not affiliated with HoYoverse.</p>
        <p>
          Genshin Impact, game content and materials are trademarks and
          copyrights of HoYoverse.
        </p>
      </div>
      <div className="flex gap-4 items-center m-4 mb-0 pb-4">
        <Image
          src={"/img/etc/github-mark-white.svg"}
          width={25}
          height={25}
          alt="github logo"
        />
        <a href="https://github.com/the-black-viper/genshin-randomizer">
          Github Page
        </a>
      </div>
    </footer>
  );
}

export default Footer;
