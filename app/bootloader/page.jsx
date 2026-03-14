"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function BootLoader({ onFinish }) {
    const loaderRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                onFinish();
            }
        });

        tl.from(loaderRef.current, {
            opacity: 0,
            duration: 0.5
        })
            .to(progressRef.current, {
                width: "100%",
                duration: 1.5,
                ease: "power2.out"
            })
            .to(loaderRef.current, {
                opacity: 0,
                duration: 0.5
            });

    }, []);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white"
        >
            <Image src="/apple-logo.svg" width={200} height={200} alt="mac-os-logo" />
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-2 bg-gray-700 rounded">
                <div
                    ref={progressRef}
                    className="h-2 bg-white rounded"
                    style={{ width: "0%" }}
                />
            </div>
        </div>
    );
}
