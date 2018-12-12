import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <div className="article">
          <div className="page" />
        </div>
      </div>
      <div className="loading-text">불러오는 중입니다..!</div>
    </div>
  );
};

export default LoadingIndicator;
