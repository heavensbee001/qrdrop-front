import Image from "next/image";
export default function CreatePoapForm({
    active = true,
}: {
    active?: boolean;
}) {
    const handleClick = () => {
        console.log("click");
    };
    return (
        <section className="text-orange font-normal flex flex-col items-center">
            <input
                type="uri"
                placeholder="image uri"
                className="placeholder:text-orange border-b-2 border-orange w-4/5 mt-4 mb-2"
            />
            <input
                type="name"
                placeholder="token name"
                className="placeholder:text-orange border-b-2 border-orange w-4/5 mt-4 mb-2"
            />
            <div
                className="justify-end mt-4 w-4/5 mx-auto flex justify-end group"
                onClick={active ? handleClick : () => {}}
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
            </div>
        </section>
    );
}
