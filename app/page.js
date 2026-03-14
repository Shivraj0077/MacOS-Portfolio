"use client"

import { useState } from "react";
import BootLoader from "./bootloader/page";
import Home from "./home/page";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <BootLoader onFinish={() => setLoaded(true)} />}
      {loaded && <Home />}
    </>
  );
}