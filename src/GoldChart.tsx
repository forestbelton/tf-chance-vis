import { LineSvgProps, ResponsiveLine, Serie } from "@nivo/line";
import { maxWaveGold, minWaveGold, numMinions } from "./logic";

type GoldChartProps = {
  data: Serie;
};

const CHART_PROPS: Omit<LineSvgProps, "data"> = {
  axisBottom: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "extra gold per wave",
    legendOffset: 36,
    legendPosition: "middle",
    truncateTickAt: 0,
  },
  axisLeft: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "probability (%)",
    legendOffset: -40,
    legendPosition: "middle",
    truncateTickAt: 0,
  },
  curve: "basis",
  enablePoints: false,
  margin: { top: 10, bottom: 50, left: 50 },
  xScale: {
    type: "linear",
    min: minWaveGold(numMinions(false)),
    max: maxWaveGold(numMinions(true)),
  },
  yScale: {
    type: "linear",
    min: 0,
    max: 10,
  },
};

const GoldChart = ({ data }: GoldChartProps) => (
  <div className="GoldChart">
    <ResponsiveLine {...CHART_PROPS} data={[data]} />
  </div>
);

export default GoldChart;
