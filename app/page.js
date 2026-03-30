"use client"

import { useState } from "react";
import BootLoader from "./components/bootloader/page";
import Home from "./home/page";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-black w-screen h-screen overflow-hidden select-none">
      {!loaded && <BootLoader onFinish={() => setLoaded(true)} />}
      {loaded && <Home />}
    </div>
  );
}