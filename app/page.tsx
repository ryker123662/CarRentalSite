"use client";

import { useEffect, useState } from "react";
import { CarCard, Hero, ShowMore } from "@/components";
import CustomFilter from "@/components/CustomFilter";
import SearchBar from "@/components/SearchBar";
import { fuels, yearsOfProduction } from "@/constants";

import { fetchCars } from "@/utils";
import Image from "next/image";
import { CarState } from "@/types";

export default function Home() {
    const [allCars, setAllCars] = useState<CarState>([]);
    const [loading, setLoading] = useState(false);

    // search states
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");

    // filter states
    const [fuel, setFuel] = useState("");
    const [year, setYear] = useState(2022);

    // pagination states
    const [limit, setLimit] = useState(10);

    // fetch cars
    const getCars = async () => {
        setLoading(true);
        try {
            const result = await fetchCars({
                manufacturer: manufacturer || "",
                year: year || 2022,
                fuel: fuel || "",
                limit: limit || 10,
                model: model || "",
            });
            setAllCars(result);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(fuel, year, manufacturer, model, limit);
        getCars();
    }, [fuel, year, manufacturer, model, limit]);

    return (
        <main className="overflow-hidden">
            <Hero />

            <div
                className="mt-12 padding-x padding-y max-width"
                id="discover">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
                    <p>Explore the cars you might like</p>
                </div>

                <div className="home__filters">
                    <SearchBar
                        setManuFacturer={setManufacturer}
                        setModel={setModel}
                    />

                    <div className="home__filter-container">
                        <CustomFilter
                            options={fuels}
                            setFilter={setFuel}
                        />
                        <CustomFilter
                            options={yearsOfProduction}
                            setFilter={setYear}
                        />
                    </div>
                </div>

                {allCars.length > 0 ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {allCars.map((car, index) => (
                                <CarCard
                                    key={`car-${index}`}
                                    car={car}
                                />
                            ))}
                        </div>
                        {loading && (
                            <div className="mt-16 w-full flex-center">
                                <Image
                                    src="/loader.svg"
                                    alt="loader"
                                    width={50}
                                    height={50}
                                    className="object-contain"
                                />
                            </div>
                        )}

                        <ShowMore
                            pageNumber={limit / 10}
                            isNext={limit > allCars.length}
                            setLimit={setLimit}
                        />
                    </section>
                ) : (
                    <div className="home__error-container">
                        <h2 className="text-black text-xl font-bold">
                            Sorry, no results
                        </h2>
                        <p>{allCars?.message}</p>
                    </div>
                )}
            </div>
        </main>
    );
}
