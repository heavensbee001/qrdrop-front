import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextComponentType } from "next";
import Image from "next/image";
import { useEffect } from "react";
import { abi } from "../utils/abi/Factory.json";
import { useConnect, useContract, useProvider } from "wagmi";

export const ConnectButtonCustom: NextComponentType = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className="w-full fixed z-20"
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button
                    className="relative w-full bg-pink text-white py-3 roboto-font"
                    onClick={openConnectModal}
                    type="button"
                  >
                    <span className="relative">
                      Connect Wallet
                      <div className="absolute -right-12 animate-bounce">
                        <Image
                          src="/images/hand_cursor.svg"
                          alt="cursor"
                          width={33}
                          height={43}
                        />
                      </div>
                    </span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="w-full bg-pink text-white py-3 roboto-font"
                  >
                    <span>Wrong network</span>
                  </button>
                );
              }

              return (
                <div className="w-full fixed top-0 left-0 bg-white px-4 py-3 shadow-md">
                  <div className="flex w-full max-w-2xl mx-auto">
                    <button
                      onClick={openChainModal}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 24,
                            height: 24,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{
                                width: 24,
                                height: 24,
                              }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>

                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="ml-auto"
                    >
                      {account.displayName}
                      {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""} */}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
