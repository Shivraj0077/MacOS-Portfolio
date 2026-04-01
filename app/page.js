"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootLoader from "./components/bootloader/page";
import Home from "./home/page";
import Preloader from "./components/Preloader";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-black w-screen h-screen overflow-hidden select-none relative">
      <Preloader />
      {/* Pre-load Home behind the loader */}
      <Home isLoaded={loaded} />
      
      <AnimatePresence>
        {!loaded && (
          <motion.div 
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="absolute inset-0 z-[9999]"
          >
            <BootLoader onFinish={() => setLoaded(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}