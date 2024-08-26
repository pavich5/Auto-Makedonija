import React from 'react';
import Lottie from 'react-lottie';
import noResultsAnimation from './NoDataLottie.json'; 

const NoResults = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: noResultsAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={200} width={200} />
      <p style={{textAlign: "center", margin: "20px"}}>No cars match your filters. Try adjusting your search criteria.</p>
    </div>
  );
};

export default NoResults;
