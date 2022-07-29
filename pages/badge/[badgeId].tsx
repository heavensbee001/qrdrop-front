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

const BadgeDetail: NextPage = () => {
  const contractParams = {
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
    contractInterface: abi,
  };
  const router = useRouter();
  const account = useAccount();
  const [badgeId, setBadgeId] = useState("");
  const [addressIsCreator, setAddressIsCreator] = useState(false);
  const [nftMetadata, setNftMetadata] = useState<NftMetadata>({
    name: "",
    description: "",
    image: "",
  });
  const [nftExistsLoaded, setNftExistsLoaded] = useState(false);
  const [nftExists, setNftExists] = useState(false);

  useEffect(() => {
    if (router.query.badgeId) setBadgeId(router.query.badgeId.toString());
  }, [router.query.badgeId]);

  const makeBadgeNFT = useContractWrite(contractParams, "makeABadgeNFT", {
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const isCreator = useContractRead(contractParams, "isCreator", {
    args: [badgeId, account.data?.address],
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      setAddressIsCreator(!!data);
      console.log("Success --->", data);
    },
  });

  const getCreatorNFT = useContractRead(contractParams, "getCreatorNFT", {
    args: [badgeId],
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
      args: [badgeId, account.data?.address],
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
    if (!badgeId) return;
    makeBadgeNFT.write({ args: badgeId });
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
      "#badge-detail canvas"
    ) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${badgeId}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div id="badge-detail">
      <Head>
        <title>QRdrop POAP</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        {badgeId && (
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
                  value={`${process.env.VERCEL_URL}/badge/${badgeId}`}
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

export default BadgeDetail;
