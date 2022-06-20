import Image from "next/image";
import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { useContractWrite } from "wagmi";
import PoapNft from "../models/poapNft.model";

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
    // const { data, isError, isLoading, write } = useContractWrite(
    //     {
    //         addressOrName: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
    //         contractInterface: qrdropABI,
    //     },
    //     "createPoap"
    // );

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const uuid = uuidv4();
        const poapNft = new PoapNft(formData.uri, uuid, formData.name);
        sendNft();
    };

    const sendNft = () => {
        // write();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="text-orange font-normal flex flex-col items-center"
        >
            <input
                name="uri"
                placeholder="image uri"
                className="placeholder:text-orange border-b-2 border-orange w-4/5 mt-4 mb-2"
                required
                onChange={setFormData}
            />
            <input
                name="name"
                placeholder="token name"
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
