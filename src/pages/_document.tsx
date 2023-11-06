import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <footer className="absolute bottom-0 flex w-full items-center justify-center border-t bg-gray-100 p-2">
          <a href="">Luiz Paulo @ 2023</a>
        </footer>
        <NextScript />
      </body>
    </Html>
  );
}
