import { useState } from "react";
import AbilityCard from "./AbilityCard";
import ChartParameterForm from "./ChartParameterForm";
import GoldChart from "./GoldChart";
import { type Probabilities } from "./logic";

type AppProps = {
  probabilities: Probabilities;
};

const App = ({ probabilities }: AppProps) => {
  const [series, setSeries] = useState(probabilities[0]["false"]);
  const updateSeries = (critChance: number, isCannonWave: boolean) =>
    setSeries(probabilities[critChance][isCannonWave.toString()]);

  return (
    <div className="App">
      <h1>Twisted Fate's Loaded Dice</h1>
      <AbilityCard />
      <GoldChart data={series} />
      <ChartParameterForm onFormChange={updateSeries} />
    </div>
  );
};

export default App;
