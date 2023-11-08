import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-gray-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
