"use client";

import Image from "next/image";
import React, { useState } from "react";

interface CustomImageProps {
    src: string;
    alt?: string;
    className?: string;
    isBackground?: boolean;
    width?: number;
    height?: number;
}

const CustomImage: React.FC<CustomImageProps> = ({
    src,
    alt,
    className,
    isBackground = false,
    width = 500,
    height = 300,
}) => {
    const [loaded, setLoaded] = useState(false);

    if (isBackground) {
        return (
            <div className={`relative w-full h-full ${className}`}>
                {/* Skeleton Loader (Shimmer Effect) */}
                {!loaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}

                {/* Background Image with Fade-in Effect */}
                <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                        loaded ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                        backgroundImage: `url(${src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                {/* Hidden Image to Detect Load Event */}
                <img
                    src={src}
                    className="hidden"
                    onLoad={() => setLoaded(true)}
                    alt={alt || "background"}
                />
            </div>
        );
    }

    return (
        <div className="relative" style={{ width, height }}>
            {/* Skeleton Loader */}
            {!loaded && (
                <div
                    className="absolute inset-0 bg-gray-200 animate-pulse"
                    style={{ width, height }}
                />
            )}

            {/* Actual Image with Fade-in Effect */}
            <Image
                src={src}
                alt={alt || "image"}
                className={`w-full h-full object-cover transition-opacity duration-00 ${
                    loaded ? "opacity-100" : "opacity-0"
                } ${className}`}
                onLoad={() => setLoaded(true)}
                width={width}
                height={height}
            />
        </div>
    );
};

export default CustomImage;
