import { ResponsiveLine, Serie } from "@nivo/line";
import { maxWaveGold, minWaveGold, numMinions } from "./logic";

type GoldChartProps = {
  data: Serie;
};

const GoldChart = ({ data }: GoldChartProps) => (
  <div style={{ height: 300, width: 500 }}>
    <ResponsiveLine
      curve="basis"
      margin={{ top: 50, bottom: 50, left: 50 }}
      data={[data]}
      xScale={{
        type: "linear",
        min: minWaveGold(numMinions(false)),
        max: maxWaveGold(numMinions(true)),
      }}
      yScale={{
        type: "linear",
        min: 0,
        max: 10,
      }}
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

export default GoldChart;
