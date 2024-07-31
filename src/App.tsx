import debounce from "debounce";
import React, { useCallback, useState } from "react";
import GoldChart from "./GoldChart";

const App = () => {
  const [critChance, setCritChance] = useState(0);
  const [isCannonWave, setIsCannonWave] = useState(false);

  const setCritChanceDebounced = useCallback(debounce(setCritChance, 25), []);

  const updateCritChance = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setCritChanceDebounced(parseFloat(ev.target.value));
  };

  const updateIsCannonWave = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setIsCannonWave(ev.target.checked);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Twisted Fate's Loaded Dice</h1>
      <GoldChart critChance={critChance} isCannonWave={isCannonWave} />
      <div style={{ display: "flex", marginTop: "2rem" }}>
        <label
          htmlFor="critChance"
          style={{ minWidth: "7rem", textAlign: "left" }}
        >
          Crit chance:
        </label>
        <input
          name="critChance"
          type="range"
          min="0"
          max="100"
          defaultValue="0"
          onChange={updateCritChance}
          style={{ flexGrow: "1" }}
        />
        <span style={{ minWidth: "3rem", textAlign: "right" }}>
          {critChance} %
        </span>
      </div>
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <label
          htmlFor="isCannonWave"
          style={{ minWidth: "7rem", textAlign: "left" }}
        >
          Cannon wave:
        </label>
        <input
          name="isCannonWave"
          type="checkbox"
          checked={isCannonWave}
          onChange={updateIsCannonWave}
        />
      </div>
    </div>
  );
};

export default App;
