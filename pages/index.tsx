import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    const [accountReady, setAccountReady] = useState(false);
    const [activeForm, setActiveForm] = useState(false);
    const { data: account } = useAccount();

    console.log(account);

    useEffect(() => {
        setAccountReady(Boolean(account));
    }, [account]);

    const handleClickAddPoap = () => {
        setActiveForm(!activeForm);
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>QRdrop</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="relative max-w-sm w-screen-sm mx-auto pt-96 mt-8 mb-12">
                <Image src="/images/qrdrop.svg" alt="QRdrop" layout="fill" />
            </section>
            <div
                className={`relative w-4/5 h-12 flex mx-auto ${
                    accountReady ? "bg-orange cursor-pointer" : "bg-gray-300"
                }`}
                onClick={handleClickAddPoap}
            >
                <div
                    className={`absolute w-full h-12 bottom-0 ease-in-out duration-200 ${
                        activeForm ? "h-64" : ""
                    }`}
                >
                    <div
                        className={`absolute h-full w-12 h-12 z-2 flex justify-center items-center text-white font-bold text-2xl ${
                            accountReady ? "bg-orange" : "bg-gray-300"
                        }`}
                    >
                        <span
                            className={`ease-in-out duration-200 ${
                                activeForm ? "rotate-45 translate-x-0.5" : ""
                            }`}
                        >
                            +
                        </span>
                    </div>
                    <div
                        className={`bg-white ${
                            accountReady ? "border-orange" : "border-gray-300"
                        } border-4 w-full flex justify-center roboto-font h-full`}
                    >
                        <span
                            className={`ease-in-out duration-200 mt-2 ${
                                accountReady ? "text-orange" : "text-gray-300"
                            }`}
                        >
                            Create POAP
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
