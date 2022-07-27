import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useReducer } from "react";
import { useContractEvent, useContractWrite } from "wagmi";
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

    write({
      args: [
        formData.name,
        formData.symbol,
        formData.description,
        formData.uri,
      ],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-orange font-normal flex flex-col items-center h-full pt-8"
    >
      <div className="grid grid-cols-5 w-4/5">
        <div className="col-span-3">
          <input
            name="uri"
            placeholder="image uri *"
            className="placeholder:text-orange border-b-2 border-orange w-full mt-4 mb-2"
            required
            onChange={setFormData}
          />
          <input
            name="name"
            placeholder="token name *"
            className="placeholder:text-orange border-b-2 border-orange w-full mt-4 mb-2"
            required
            onChange={setFormData}
          />
          <input
            name="symbol"
            placeholder="token symbol *"
            className="placeholder:text-orange border-b-2 border-orange w-full mt-4 mb-2"
            required
            onChange={setFormData}
          />
        </div>
        <div className="text-right col-span-2 pl-4 -mr-6 flex items-center max-h-[240px] overflow-y-scroll h-[200px]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: "url(/images/img-bg.svg)",
              backgroundSize: "20% 20%",
            }}
          >
            {formData.uri && (
              <img src={`${formData.uri}`} alt="cursor" className="" />
            )}
          </div>
        </div>
      </div>
      <textarea
        name="description"
        placeholder="description *"
        className="placeholder:text-orange border-b-2 border-orange w-4/5 mt-4 mb-12"
        required
        onChange={setFormData}
      />

      {active && (
        <div className="absolute z-20 right-4 bottom-2 w-4/5 mx-auto group flex justify-end">
          <button disabled={!active} className="flex">
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
        </div>
      )}
    </form>
  );
}
