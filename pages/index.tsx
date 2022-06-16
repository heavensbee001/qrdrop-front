import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    const handleClickAddPoap = () => {};
    return (
        <div className={styles.container}>
            <Head>
                <title>QRdrop</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1 className="">QRdrop</h1>
            <section>
                <div className="bg-orange relative w-48 h-12 box-border flex">
                    <div className="h-full w-12 h-12 z-2 flex justify-center items-center text-white font-bold text-2xl">
                        +
                    </div>
                    <div
                        className="bg-white border-orange border-4 border-l-0 w-36 flex justify-center items-center roboto-font text-orange"
                        onClick={handleClickAddPoap}
                    >
                        <span className="">Add POAP</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
