import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";

const PoapDetail: NextPage = () => {
    const router = useRouter();
    const [poapId, setPoapId] = useState("");

    useEffect(() => {
        if (router.query.poapId) setPoapId(router.query.poapId.toString());
    }, [router.query.poapId]);

    const downloadQr = () => {
        console.log("download");

        // Generate download with use canvas and stream
        const canvas = document.querySelector(
            "#poap-detail canvas"
        ) as HTMLCanvasElement;
        debugger;
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
                <button onClick={downloadQr} className="mt-12">
                    Download QR
                </button>
            </section>
        </div>
    );
};

export default PoapDetail;
