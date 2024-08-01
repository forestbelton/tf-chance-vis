import debounce from "debounce";
import React, { useCallback, useState } from "react";
import GoldChart from "./GoldChart";
import { Serie } from "@nivo/line";
import { generateSeries } from "./logic";

const CRIT_COLOR_HEX = "#e84118";
const GOLD_COLOR_HEX = "#fbc531";

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
      <div
        style={{
          marginTop: "1rem",
          maxWidth: 500,
          textAlign: "left",
          border: "1px solid #353b48",
          borderRadius: 4,
          paddingLeft: "0.75rem",
          paddingRight: "0.75rem",
        }}
      >
        <p>
          Whenever <strong>Twisted Fate</strong> kills an enemy, he generates{" "}
          <strong style={{ color: GOLD_COLOR_HEX }}>1 - 6 gold</strong>. He also
          has a chance equal to his{" "}
          <strong style={{ color: CRIT_COLOR_HEX }}>
            critical strike chance
          </strong>{" "}
          to generate an additional{" "}
          <strong style={{ color: GOLD_COLOR_HEX }}>1 - 6 gold</strong>.
        </p>
        <p style={{ fontStyle: "italic" }}>
          As you'd expect, <strong>Twisted Fate</strong> plays with loaded dice.
          His initial dice roll is weighted to have an increased chance of
          granting <strong style={{ color: GOLD_COLOR_HEX }}>6 gold</strong>,
          while his critical dice roll is weighted against him and has an
          increased chance of granting{" "}
          <strong style={{ color: GOLD_COLOR_HEX }}>1 gold</strong>.
        </p>
      </div>
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
