import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import CreateBadgeForm from "../components/createBadgeForm";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [accountReady, setAccountReady] = useState(false);
  const [activeForm, setActiveForm] = useState(false);
  const { data: account } = useAccount();

  useEffect(() => {
    setAccountReady(Boolean(account));
    if (!account) setActiveForm(false);
  }, [account]);

  const handleClickAddBadge = () => {
    if (account) setActiveForm(!activeForm);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>BADGE protocol</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="relative w-[90%] pt-24 md:pt-12 pb-20 md:w-[70%] mx-auto mt-8 mb-12">
        <img src="/images/main_title.svg" alt="BADGE protocol" />
      </section>
      <div
        className={`relative w-4/5 h-12 flex mx-auto ${
          accountReady ? "bg-orange" : "bg-gray-300"
        } ${accountReady && !activeForm ? "cursor-pointer" : ""}`}
        onClick={!activeForm ? handleClickAddBadge : () => {}}
      >
        <div
          className={`absolute w-full h-12 bottom-0 ease-in-out duration-200 overflow-hidden ${
            activeForm ? "h-[440px]" : ""
          }`}
        >
          <div
            className={`z-10 absolute h-12 w-12 h-12 z-2 flex justify-center items-center text-white font-bold text-2xl cursor-pointer ${
              accountReady ? "bg-orange" : "bg-gray-300"
            }`}
            onClick={activeForm ? handleClickAddBadge : () => {}}
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
            } border-4 w-full roboto-font h-full overflow-y-scroll`}
          >
            {!activeForm && (
              <p
                className={`w-full ease-in-out duration-200 mt-2 text-center ${
                  accountReady ? "text-orange" : "text-gray-300"
                }`}
              >
                Create BADGE
              </p>
            )}
            <div className={`overflow-hidden ${activeForm ? "h-full" : "h-0"}`}>
              {accountReady && <CreateBadgeForm active={activeForm} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
