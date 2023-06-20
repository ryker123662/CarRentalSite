"use client";
import React from "react";
import { useState } from "react";

import SearchManufacturer from "./SearchManufacturer";
import Image from "next/image";
import { SearchBarProps } from "@/types";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button
        type="submit"
        className={`-ml-3 z-10 ${otherClasses}`}>
        <Image
            src="/magnifying-glass.svg"
            alt="magnifying glass"
            width={40}
            height={40}
            className="object-contain"
        />
    </button>
);

const SearchBar = ({ setManuFacturer, setModel }: SearchBarProps) => {
    const [searchManufacturer, setSearchManufacturer] = useState("");
    const [searchModal, setSearchModal] = useState("");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (searchManufacturer === "" && searchModal === "") {
            return alert("Please enter a manufacturer or model");
        }

        setModel(searchModal);
        setManuFacturer(searchManufacturer);
    };

    return (
        <form
            className="searchbar"
            onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchManufacturer
                    selected={searchManufacturer}
                    setSelected={setSearchManufacturer}
                />
                <SearchButton otherClasses="sm:hidden" />
            </div>

            <div className="searchbar__item">
                <Image
                    src="/model-icon.png"
                    width={25}
                    height={25}
                    className="absolute w-[20px] h-[20px] ml-4"
                    alt="car model icon"
                />
                <input
                    type="text"
                    name="modal"
                    value={searchModal}
                    onChange={(e) => setSearchModal(e.target.value)}
                    placeholder="Tiguan..."
                    className="searchbar__input"
                />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <SearchButton otherClasses="max-sm:hidden" />
        </form>
    );
};

export default SearchBar;
