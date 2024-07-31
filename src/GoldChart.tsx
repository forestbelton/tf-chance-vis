import { Datum, ResponsiveLine, Serie } from "@nivo/line";
import { ScaleLinearSpec } from "@nivo/scales";

const NUM_TRIALS = 100000;

const FIRST_ROLL_WEIGHTS = {
  1: (1 - 1 / 3) / 5,
  2: (1 - 1 / 3) / 5,
  3: (1 - 1 / 3) / 5,
  4: (1 - 1 / 3) / 5,
  5: (1 - 1 / 3) / 5,
  6: 1 / 3,
};

const SECOND_ROLL_WEIGHTS = {
  1: 1 / 3,
  2: (1 - 1 / 3) / 5,
  3: (1 - 1 / 3) / 5,
  4: (1 - 1 / 3) / 5,
  5: (1 - 1 / 3) / 5,
  6: (1 - 1 / 3) / 5,
};

const MIN_WAVE_GOLD = 1 * 1 * 6;
const MAX_WAVE_GOLD = 6 * 2 * 6;

const coinFlip = (bias: number): boolean => {
  return Math.random() * 100 < bias;
};

const weightedRoll = (weights: Record<number, number>): number => {
  let random = Math.random();

  for (const [roll, weight] of Object.entries(weights)) {
    if (random <= weight) {
      return parseInt(roll, 10);
    }
    random -= weight;
  }

  throw new Error("should not happen");
};

const generateSeries = (critChance: number): Serie => {
  const hist: Record<number, number> = {};

  for (let i = 0; i < NUM_TRIALS; i++) {
    let gold = 0;

    for (let i = 0; i < 6; i++) {
      gold += weightedRoll(FIRST_ROLL_WEIGHTS);
      if (coinFlip(critChance)) {
        gold += weightedRoll(SECOND_ROLL_WEIGHTS);
      }
    }

    hist[gold] = (hist[gold] || 0) + 1;
  }

  const data: Datum[] = [];
  for (let gold = MIN_WAVE_GOLD; gold <= MAX_WAVE_GOLD; gold++) {
    data.push({
      x: gold,
      y: ((hist[gold] || 0) / NUM_TRIALS) * 100,
    });
  }

  return {
    id: `${critChance}%`,
    data,
  };
};

type GoldChartProps = {
  critChance: number;
};

const GoldChart = ({ critChance }: GoldChartProps) => {
  const xScale: ScaleLinearSpec = {
    type: "linear",
    min: MIN_WAVE_GOLD,
    max: MAX_WAVE_GOLD,
  };

  const yScale: ScaleLinearSpec = {
    type: "linear",
    min: 0,
    max: 10,
  };

  return (
    <div style={{ height: 300, width: 500 }}>
      <ResponsiveLine
        margin={{ top: 50, bottom: 50, left: 50 }}
        data={[generateSeries(critChance)]}
        xScale={xScale}
        yScale={yScale}
        yFormat={" >-.2f"}
        enablePoints={false}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "probability (%)",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "extra gold per wave",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
      />
    </div>
  );
};

export default GoldChart;
