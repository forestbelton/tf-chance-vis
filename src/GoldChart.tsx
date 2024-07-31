import { Datum, ResponsiveLine, Serie } from "@nivo/line";
import { ScaleLinearSpec } from "@nivo/scales";

const DEFAULT_NUM_TRIALS = 100000;

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

const numMinions = (isCannonWave: boolean) => 6 + (isCannonWave ? 1 : 0);
const minWaveGold = (numMinions: number) => 1 * 1 * numMinions;
const maxWaveGold = (numMinions: number) => 6 * 2 * numMinions;

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

const generateSeries = (props: GoldChartProps): Serie => {
  const { critChance, isCannonWave, numTrials } = props;

  const waveMinions = numMinions(isCannonWave);
  const actualTrials = numTrials || DEFAULT_NUM_TRIALS;
  const hist: Record<number, number> = {};

  for (let i = 0; i < actualTrials; i++) {
    let gold = 0;

    for (let i = 0; i < waveMinions; i++) {
      gold += weightedRoll(FIRST_ROLL_WEIGHTS);
      if (coinFlip(critChance)) {
        gold += weightedRoll(SECOND_ROLL_WEIGHTS);
      }
    }

    hist[gold] = (hist[gold] || 0) + 1;
  }

  const data: Datum[] = [];
  for (
    let gold = minWaveGold(waveMinions);
    gold <= maxWaveGold(waveMinions);
    gold++
  ) {
    data.push({
      x: gold,
      y: ((hist[gold] || 0) / DEFAULT_NUM_TRIALS) * 100,
    });
  }

  return {
    id: `${critChance}%`,
    data,
  };
};

type GoldChartProps = {
  critChance: number;
  isCannonWave: boolean;
  numTrials?: number;
};

const GoldChart = (props: GoldChartProps) => {
  const xScale: ScaleLinearSpec = {
    type: "linear",
    min: minWaveGold(numMinions(false)),
    max: maxWaveGold(numMinions(true)),
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
        data={[generateSeries(props)]}
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
