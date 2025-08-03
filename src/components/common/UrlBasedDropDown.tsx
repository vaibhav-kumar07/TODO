"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface DropdownProps {
    options: { label: string; value: string }[];
    paramKey: string;
    className?: string;
    optionClass?: string;
    placeholder?: string;
}

const UrlBasedDropdown: React.FC<DropdownProps> = ({
    options,
    paramKey,
    className,
    optionClass,
    placeholder,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Retrieve the current value for the paramKey from the search params
    const defaultValue = searchParams.get(paramKey) || "";
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setSelectedValue(defaultValue);
    }, [defaultValue]);

    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (value: string) => {
        const updatedParams = new URLSearchParams(searchParams.toString());

        if (value) {
            updatedParams.set(paramKey, value); // Replace or add the param key with the new value
        } else {
            updatedParams.delete(paramKey); // Remove the param key if the value is empty
        }

        setSelectedValue(value);
        router.push(`?${updatedParams.toString()}`);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative ">
            <button
                onClick={handleDropdownToggle}
                className={cn(
                    "min-w-20  border border-gray-300 shadow-md rounded px-4 md:px-4 py-2 md:py-2 text-sm font-medium bg-white  flex justify-between items-center focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 ease-in-out",
                    className,
                )}
            >
                {selectedValue
                    ? options.find((option) => option.value === selectedValue)
                          ?.label
                    : placeholder}
                <span className="ml-2 text-sm md:text-xs  text-gray-400">
                    {isOpen ? "▲" : "▼"}
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute min-w-full mt-1 bg-white shadow-lg rounded border border-gray-300 z-10">
                    <ul className="max-h-screen">
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleOptionSelect(option.value)}
                                className={cn(
                                    "py-3 px-4 hover:bg-purple-100 hover:text-primary cursor-pointer transition duration-150 ease-in-out rounded-md",
                                    optionClass,
                                )}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UrlBasedDropdown;
