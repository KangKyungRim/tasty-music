import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: {
    default: "TASTY MUSIC",
    template: "%s | TASTY MUSIC",
  },
  description:
    "지금 이 순간에 어울리는 음악을 추천해주는 취향 기반 음악 큐레이션 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        <main className="appContainer">
          {children}
        </main>
      </body>
    </html>
  );
}