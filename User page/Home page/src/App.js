import React from "react";
import LeftColumn from "./LeftColumn";
import MiddleColumn from "./MiddleColumn";
import RightColumn from "./RightColumn";
import "./App.css";

const App = () => {
  const leftButtons = ["Home", "Profile", "Messages", "Post"];

  return (
      <div className="app">
        <LeftColumn buttons={leftButtons} />
        <MiddleColumn />
        <RightColumn />
      </div>
  );
};

export default App;