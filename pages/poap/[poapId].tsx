import { Result } from "ethers/lib/utils";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { abi } from "../../utils/abi/Factory.json";

type NftMetadata = {
  name: string;
  description: string;
  image: string;
};

const PoapDetail: NextPage = () => {
  const contractParams = {
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
    contractInterface: abi,
  };
  const router = useRouter();
  const account = useAccount();
  const [poapId, setPoapId] = useState("");
  const [addressIsCreator, setAddressIsCreator] = useState(false);
  const [nftMetadata, setNftMetadata] = useState<NftMetadata>({
    name: "",
    description: "",
    image: "",
  });
  const [nftExistsLoaded, setNftExistsLoaded] = useState(false);
  const [nftExists, setNftExists] = useState(false);

  useEffect(() => {
    if (router.query.poapId) setPoapId(router.query.poapId.toString());
  }, [router.query.poapId]);

  const makePoapNFT = useContractWrite(contractParams, "makeAPoapNFT", {
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const isCreator = useContractRead(contractParams, "isCreator", {
    args: [poapId, account.data?.address],
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      setAddressIsCreator(!!data);
      console.log("Success --->", data);
    },
  });

  const getCreatorNFT = useContractRead(contractParams, "getCreatorNFT", {
    args: [poapId],
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      setNftMetadata(parseUri(data));
      console.log("Success", parseUri(data));
    },
  });

  const getAddressNFTInCollection = useContractRead(
    contractParams,
    "getAddressNFTInCollection",
    {
      args: [poapId, account.data?.address],
      onError(error) {
        setNftExists(false);
        console.log("Error", error);
      },
      onSuccess(data) {
        setNftExists(!!Number(data));
        setNftExistsLoaded(true);
        console.log("Success", data);
      },
    }
  );

  function handleClickClaim() {
    if (!poapId) return;
    makePoapNFT.write({ args: poapId });
  }

  const parseUri = (dataURI: Result) => {
    const json = atob(dataURI.substring(29));
    const result = JSON.parse(json);
    return result;
  };

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

      <section>
        {poapId && (
          <>
            {nftExists && nftExistsLoaded && (
              <h2 className="text-center text-purple roboto-font text-2xl font-bold mb-2">
                Badge claimed!
              </h2>
            )}
            <div className="flex flex-col items-center">
              {nftMetadata.image && (
                <img src={nftMetadata.image} className="w-[300px] mb-6" />
              )}
              {!nftExists && nftExistsLoaded && (
                <button
                  onClick={handleClickClaim}
                  className="bg-pink text-white w-48 py-2 mb-2 px-12 roboto-font"
                >
                  Claim Badge
                </button>
              )}
            </div>
            {addressIsCreator && (
              <div className="flex flex-col items-center">
                <QRCode
                  value={`${process.env.VERCEL_URL}/poap/${poapId}`}
                  renderAs="canvas"
                  size={300}
                  className="mb-6 hidden"
                />
                <button
                  onClick={downloadQr}
                  className="bg-pink text-white w-48 py-2 mb-2 roboto-font"
                >
                  Download QR
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default PoapDetail;
