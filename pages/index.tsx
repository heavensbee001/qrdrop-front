import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>QRdrop</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>QRdrop</h1>
            </main>

            <footer className={styles.footer}>
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
};

export default Home;
