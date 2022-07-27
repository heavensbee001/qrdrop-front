import { ConnectButtonCustom } from "./connectButtonCustom";
import { abi } from "../utils/abi/Factory.json";
import { useContract } from "wagmi";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen flex justify-center bg-app">
      <ConnectButtonCustom />
      <main className="absolute overflow-y-scroll w-screen h-screen">
        <div className="pt-24"></div>
        <section className="max-w-screen-md mx-auto">{children}</section>
      </main>
      <footer className="fixed bottom-0 w-full bg-black text-white roboto-font text-center">
        <p>
          made by&nbsp;
          <a
            className="hover:underline font-bold hover:italic hover:cursor-pointer"
            href="http://twitter.com/_eloigil"
            target="_blank"
            rel="noopener noreferrer"
          >
            @_eloigil
          </a>
        </p>
      </footer>
    </div>
  );
}
