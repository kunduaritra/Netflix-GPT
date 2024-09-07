import React from "react";

const VideoTitle = ({ title, description }) => {
  return (
    <div className="pt-[20%] px-12 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm py-6 w-4/12">{description}</p>
      <div className="space-x-4">
        <button className="bg-white hover:bg-opacity-80 text-black shadow-md px-12 py-4 font-bold rounded-lg">
          ▶Play
        </button>
        <button className="bg-gray-400 hover:bg-opacity-80 text-white bg-opacity-50 shadow-md px-12 py-4 font-bold rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
