import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, FormEventHandler, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
} from "wagmi";
import { abi } from "../utils/abi/Factory.json";

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function CreatePoapForm({
  active = true,
}: {
  active?: boolean;
}) {
  const [formData, setFormData] = useReducer(formReducer, {});
  const router = useRouter();

  const { data, write } = useContractWrite(
    {
      addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
      contractInterface: abi,
    },
    "createCreatorNFT",
    {
      onError(error) {
        console.log("Error", error);
      },
      onSuccess(data) {
        console.log("Success", data);
      },
    }
  );

  useContractEvent(
    {
      addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
      contractInterface: abi,
    },
    "NewCreatorNFTMinted",
    (event) => {
      router.push(`/poap/${event[1]}`);
    }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    write({ args: Object.values(formData) });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-orange font-normal flex flex-col items-center"
    >
      <input
        name="name"
        placeholder="token name *"
        className="placeholder:text-orange border-b-2 border-orange w-4/5 mt-4 mb-2"
        required
        onChange={setFormData}
      />
      <input
        name="symbol"
        placeholder="token symbol *"
        className="placeholder:text-orange border-b-2 border-orange w-4/5 mt-4 mb-2"
        required
        onChange={setFormData}
      />
      <textarea
        name="description"
        placeholder="description *"
        className="placeholder:text-orange border-b-2 border-orange w-4/5 mt-4 mb-2"
        required
        onChange={setFormData}
      />
      <input
        name="uri"
        placeholder="image uri *"
        className="placeholder:text-orange border-b-2 border-orange w-4/5 mt-4 mb-2"
        required
        onChange={setFormData}
      />
      <button
        className="justify-end mt-4 w-4/5 mx-auto flex justify-end group"
        disabled={!active}
      >
        <div className="rotate-90 group-hover:-translate-x-1">
          <Image
            src="/images/hand_cursor.svg"
            alt="cursor"
            width={33}
            height={43}
          />
        </div>
        <span className="text-lime text-3xl ml-4">add</span>
      </button>
    </form>
  );
}
