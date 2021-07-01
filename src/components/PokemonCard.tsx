import { FC } from "react";
import { ClassNames } from "@44north/classnames";
import type { IPokemonRecord } from "./../types";
import Image from "next/image";

const PokemonCard: FC<{ data: IPokemonRecord; className?: string | ClassNames }> = ({
    data,
    className = ""
}) => {
    const borderClasses = new ClassNames(["border-4 border-yellow-500"]);
    const cardClasses = new ClassNames([
        "p-4",
        "rounded",
        "text-black",
        "grid grid-cols-1 gap-4",
        "shadow"
    ])
        .add(className)
        .add(borderClasses);

    switch ((data?.species?.color?.name || "").toLowerCase()) {
        case "red":
            cardClasses.add("bg-red-500");
            break;
        case "green":
            cardClasses.add("bg-green-400");
            break;
        case "blue":
            cardClasses.add("bg-blue-400");
            break;
        case "black":
            cardClasses.add("bg-black text-white");
            break;
        case "brown":
            cardClasses.add("bg-yellow-800");
            break;
        case "grey":
        case "gray":
            cardClasses.add("bg-gray-500 text-white");
            break;
        case "pink":
            cardClasses.add("bg-pink-600");
            break;
        case "purple":
            cardClasses.add("bg-purple-600");
            break;
        case "white":
            cardClasses.add("bg-white text-black");
            break;
        case "yellow":
            cardClasses.add("bg-yellow-300");
            break;
        default:
            cardClasses.add("bg-gray-600");
            break;
    }

    const hp = data.stats.filter((stat) => stat.name === "hp")[0].base_stat || 0;

    return (
        <div className={cardClasses.list()}>
            <header className="capitalize flex justify-between items-end">
                <p className="font-bold text-2xl">{data.name}</p>
                <p>
                    <span className="font-bold">HP</span>: {hp}
                </p>
            </header>
            <div>
                <div
                    className={new ClassNames(["bg-opacity-50 bg-white rounded"])
                        .add(borderClasses)
                        .list()}
                >
                    <img src={data.sprites.official_artwork_front_default} className="mx-auto" />
                </div>
                <ul className="flex bg-yellow-500 text-black mx-4 px-4 py-2 items-center justify-evenly rounded-b">
                    {data.types.map((type) => (
                        <li key={type.name} className="capitalize font-bold">
                            {type.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div
                className={new ClassNames([
                    "bg-opacity-50 bg-white rounded",
                    "p-4",
                    "grid grid-cols-1 gap-2"
                ]).list()}
            >
                {[
                    {
                        label: "Height",
                        value: data.height || "Unknown"
                    },
                    {
                        label: "Weight",
                        value: data.weight || "Unknown"
                    },
                    {
                        label: "Habitat",
                        value: data?.species?.habitat?.name || "Unknown"
                    }
                ].map((dl) => (
                    <dl key={dl.label} className="flex gap-4">
                        <dt className="w-20 font-bold">{dl.label}</dt>
                        <dd className="capitalize">{dl.value}</dd>
                    </dl>
                ))}
            </div>
        </div>
    );
};

export { PokemonCard };
