import React from "react";

import "./styles.css";

function Loading() {
  return (
    <div className="loadingScreen" style={{ display: "block" }}>
      <div className="container">
        <div className="centralizer text-center">
          <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube" />
            <div className="sk-cube2 sk-cube" />
            <div className="sk-cube4 sk-cube" />
            <div className="sk-cube3 sk-cube" />
          </div>
          <h1>Loading, building up your request...</h1>
        </div>
      </div>
    </div>
  );
}

export default Loading;
