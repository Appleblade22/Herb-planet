import React from "react";

import Dropzone from "./components/common/Dropzone/Dropzone";
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => (
  <div className="relative bg-white min-h-screen p-4">
    <Navbar />
    <main className="grid lg:grid-cols-2 pt-24 gap-5 h-full">
      <div className="h-full">
        <h2 className="text-[40px] leading-tight font-bold mb-2">
          Identify, study, and share your findings on medicinal herbs.
        </h2>
        <span>
          Discover and document the world of wild medicinal herbs with ease. Our
          platform allows you to swiftly identify these valuable plants, delve
          into their unique properties, and effortlessly share your insights.
          Whether you're a budding herbalist, nature enthusiast, or simply
          curious, this tool is your gateway to exploring and understanding the
          potent healing potential of wild herbs. Uncover the secrets of
          nature's pharmacy as you connect with the therapeutic wonders hidden
          in your surroundings.
        </span>
        <Dropzone className="p-6 mt-4 h-44 flex items-center relative border border-gray-700 text-center rounded-md hover:cursor-pointer overflow-hidden" />
      </div>
      <div className="hidden lg:flex pt-4 justify-center w-full">
        <img
          src="/assets/Plant-Research.jpg"
          alt="Potted Plant Cartoon"
          className="w-[628px] h-min"
        />
      </div>
    </main>
  </div>
);

export default App;
