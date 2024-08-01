import { Datum, Serie } from "@nivo/line";

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

export const numMinions = (isCannonWave: boolean) => 6 + (isCannonWave ? 1 : 0);
export const minWaveGold = (numMinions: number) => 1 * 1 * numMinions;
export const maxWaveGold = (numMinions: number) => 6 * 2 * numMinions;

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

export type SeriesOptions = {
  critChance: number;
  isCannonWave: boolean;
  numTrials?: number;
};

export const generateSeries = (props: SeriesOptions): Serie => {
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
    id: "Series",
    data,
  };
};

export type Probabilities = Record<number, Record<string, Serie>>;

export const generateAllSeries = (): Probabilities => {
  const allSeries: Probabilities = {};

  for (let critChance = 0; critChance <= 100; critChance += 5) {
    allSeries[critChance] = {};
    for (const isCannonWave of [false, true]) {
      allSeries[critChance][isCannonWave.toString()] = generateSeries({
        critChance,
        isCannonWave,
      });
    }
  }

  return allSeries;
};
