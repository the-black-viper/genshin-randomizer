import localFont from "@next/font/local";
import { Karla } from "@next/font/google";
import { CharacterProvider } from "context/CharacterContext";
import { ToastProvider } from "context/ToastContext";

const genshinFont = Karla({
  variable: "--font-genshin",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${genshinFont.variable} font-sans overflow-scroll scroll-smooth`}
    >
      <head>
        <title>Genshin Randomizer</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body className="overflow-hidden">
        <CharacterProvider>
          <ToastProvider>{children}</ToastProvider>
        </CharacterProvider>
      </body>
    </html>
  );
}
