import { ConnectButtonCustom } from "./connectButtonCustom";
import { NextComponentType } from "next";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen min-h-screen flex justify-center bg-app">
            <ConnectButtonCustom />
            <main className="absolute">
                <div className="pt-12"></div>
                {children}
            </main>
            <footer className="fixed bottom-0 w-full bg-black text-white bv-font text-center">
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
