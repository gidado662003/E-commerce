import React from "react";
import Hero from "../components/Hero";
import LatesttCollection from "../components/LatesttCollection";

function Home() {
  return (
    <div>
      <Hero />
      <div className="mt-10">
        <LatesttCollection />
      </div>
    </div>
  );
}

export default Home;
