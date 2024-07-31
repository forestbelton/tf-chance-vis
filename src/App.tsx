import debounce from "debounce";
import React, { useCallback, useState } from "react";
import GoldChart from "./GoldChart";

const App = () => {
  const [critChance, setCritChance] = useState(0);
  const setCritChanceDebounced = useCallback(debounce(setCritChance, 25), []);

  const updateCritChance = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    setCritChanceDebounced(parseFloat(ev.target.value));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Twisted Fate's Loaded Dice</h1>
      <GoldChart critChance={critChance} />
      <div style={{ display: "flex", marginTop: "2rem" }}>
        <label htmlFor="critChance">Crit chance:</label>
        <input
          name="critChance"
          type="range"
          min="0"
          max="100"
          defaultValue="0"
          onChange={updateCritChance}
          style={{ marginLeft: "2rem", marginRight: "2rem", flexGrow: "1" }}
        />
        <span>{critChance} %</span>
      </div>
      <div style={{ fontStyle: "italic", marginTop: "2rem" }}>
        NOTE: Does not account for cannon waves
      </div>
    </div>
  );
};

export default App;
