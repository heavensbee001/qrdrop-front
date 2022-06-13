import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextComponentType } from "next";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <section>
                <ConnectButton />
            </section>
            {children}
            <footer>
                <a
                    href="https://rainbow.me"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Made with ❤️ by your frens at 🌈
                </a>
            </footer>
        </div>
    );
}
