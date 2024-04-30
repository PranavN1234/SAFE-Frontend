import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const Linechart = ({ transactionHistory }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Transform data to fit the Nivo Line chart format
  // Use index as the x value instead of the date
  const checkingData =
    transactionHistory?.checkingTransactions?.map((entry, index) => ({
      x: index + 1, // Starting from 1 for better readability
      y: parseFloat(entry.balance),
    })) || [];

  const savingsData =
    transactionHistory?.savingsTransactions?.map((entry, index) => ({
      x: index + 1,
      y: parseFloat(entry.balance),
    })) || [];

  const data = [
    { id: "Checking", color: "hsl(14, 70%, 50%)", data: checkingData },
    { id: "Savings", color: "hsl(214, 70%, 50%)", data: savingsData },
  ];

  return (
    data && (
      <div style={{ height: 400 }}>
        <ResponsiveLine
          data={data}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.gray[100],
                },
              },
              legend: {
                text: {
                  fill: colors.gray[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.gray[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.gray[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.gray[100],
              },
            },
            tooltip: {
              container: {
                color: colors.primary[500],
              },
            },
          }}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Date",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Balance ($)",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    )
  );
};

export default Linechart;
