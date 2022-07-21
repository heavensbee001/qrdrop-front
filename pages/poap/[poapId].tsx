import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { abi } from "../../utils/abi/Factory.json";

const PoapDetail: NextPage = () => {
  const router = useRouter();
  const account = useAccount();
  const [poapId, setPoapId] = useState("");

  useEffect(() => {
    if (router.query.poapId) setPoapId(router.query.poapId.toString());
  }, [router.query.poapId]);

  const readAll = useContractRead(
    {
      addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
      contractInterface: abi,
    },
    "getAddressCreatorNFTs",
    {
      onError(error) {
        console.log("Error", error);
      },
      onSuccess(data) {
        console.log("Success", data);
      },
      args: [account.data?.address],
    }
  );
  const readOne = useContractRead(
    {
      addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
      contractInterface: abi,
    },
    "getCreatorNFT",
    {
      onError(error) {
        console.log("Error", error);
      },
      onSuccess(data) {
        console.log("Success", data);
      },
      args: [readAll && readAll.data ? readAll.data[0] : ""],
    }
  );

  useEffect(() => {
    console.log("---->", readAll.data);
    console.log("-------->", readOne.data);
  }, [readAll.data]);

  const downloadQr = () => {
    console.log("download");

    // Generate download with use canvas and stream
    const canvas = document.querySelector(
      "#poap-detail canvas"
    ) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${poapId}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  return (
    <div id="poap-detail">
      <Head>
        <title>QRdrop POAP</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex flex-col items-center">
        {router.query.poapId && (
          <QRCode
            value={`${process.env.VERCEL_URL}/poap/${poapId}`}
            renderAs="canvas"
            size={300}
          />
        )}
        <button
          onClick={downloadQr}
          className="mt-8 bg-pink text-white py-3 px-12 roboto-font"
        >
          Download QR
        </button>
      </section>
    </div>
  );
};

export default PoapDetail;
