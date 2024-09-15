"use client";

import BackButton from "@/components/BackButton";
import { PlusIcon } from "@/components/Icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import TextToSpeech from "./TextToSpeech";

function ShowMeal({ URL }) {
    const [mealData, setMealData] = useState(null);

    useEffect(() => {
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setMealData(data.meals[0]);
                console.log(mealData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="min-h-screen py-10 bg-base-300 flex justify-center items-center">
            <BackButton />
            {mealData ? (
                <div className="relative max-w-96 md:max-w-7xl w-full bg-base-200 text-base-content shadow-md rounded-lg overflow-hidden">
                    <div className="px-10 md:px-20 py-10">
                        <h1 className="text-3xl md:text-4xl text-center font-bold text-primary mb-4">
                            {mealData.strMeal} 🍲
                        </h1>
                        <div className="flex flex-col md:flex-row gap-10">
                            <div>
                                <img
                                    src={mealData.strMealThumb}
                                    alt={mealData.strMeal}
                                    className="max-w-72 md:max-w-xl h-auto rounded-lg mb-4"
                                />
                                <div className="flex items-center space-x-4 mb-4">
                                    <span className="badge badge-primary">
                                        {mealData.strArea}
                                    </span>
                                    <span className="badge badge-success">
                                        {mealData.strCategory}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl text-neutral-content font-semibold mb-2 flex items-center">
                                    <PlusIcon />
                                    <span className="ml-2">Ingredients</span>
                                </h2>
                                <table className="w-full mb-4">
                                    <tbody>
                                        {Object.keys(mealData)
                                            .filter(
                                                (key) => key.includes("strIngredient") && mealData[key]
                                            )
                                            .map((key, index) => (
                                                <tr key={index}>
                                                    <td className="py-1 pr-4">{mealData[key]}</td>
                                                    <td className="py-1">
                                                        {mealData[`strMeasure${key.slice(13)}`]}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl text-neutral-content font-semibold mb-2 flex items-center">
                                <PlusIcon />
                                <span className="ml-2">Instructions</span>
                            </h2>
                            <p className="text-base-content">{mealData.strInstructions}</p>
                            <TextToSpeech text={mealData.strInstructions} />
                        </div>
                        {mealData.strYoutube && (
                            <Link
                                href={mealData.strYoutube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                🎥 Watch on YouTube
                            </Link>
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-gray-800 text-lg">Loading...</div>
            )}
        </div>
    );
}

export default ShowMeal;
