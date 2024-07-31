import debounce from "debounce";
import React, { useCallback, useState } from "react";
import GoldChart from "./GoldChart";
import { Serie } from "@nivo/line";
import { generateSeries } from "./logic";

const App = () => {
  const [critChance, setCritChance] = useState(0);
  const [isCannonWave, setIsCannonWave] = useState(false);
  const [data, setData] = useState<Serie>(() =>
    generateSeries({
      critChance,
      isCannonWave,
    })
  );

  const updateData = useCallback(
    debounce((critChance: number, isCannonWave: boolean) => {
      const newData = generateSeries({ critChance, isCannonWave });
      setData(newData);
    }, 100),
    []
  );

  const updateCritChance = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newCritChance = parseFloat(ev.target.value);
    setCritChance(newCritChance);
    updateData(newCritChance, isCannonWave);
  };

  const updateIsCannonWave = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newIsCannonWave = ev.target.checked;
    setIsCannonWave(newIsCannonWave);
    updateData(critChance, newIsCannonWave);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Twisted Fate's Loaded Dice</h1>
      <GoldChart data={data} />
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
          step="5"
          value={critChance}
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
