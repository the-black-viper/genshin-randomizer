export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Genshin Randomizer</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body>{children}</body>
    </html>
  );
}
