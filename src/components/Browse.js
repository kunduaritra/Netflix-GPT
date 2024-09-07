import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SeconderyContainer from "./SeconderyContainer";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <div className="w-full bg-black h-20 mb-[-180px] flex items-center justify-between">
        <Header />
      </div>
      <MainContainer />
      <SeconderyContainer />
      {/* 
        Main Container
         -- Video background
         -- Video Title
         -- Video Description
        Secondery Container
         -- Reco Movie List
          -- Movie Card
      */}
    </div>
  );
};

export default Browse;
