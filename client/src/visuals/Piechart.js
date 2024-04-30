import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const PieChart = ({ loan }) => {
  // Prepare the data for a single loan pie chart
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = [
    {
      id: `Paid`,
      label: `Paid`,
      value: loan.loan_paid,
      color: "hsl(2, 70%, 50%)", // Paid amount color
    },
    {
      id: `Remaining`,
      label: `Remaining`,
      value: loan.remaining_loan,
      color: "hsl(214, 70%, 50%)", // Remaining amount color
    },
  ];

  return (
    <div style={{ height: 400 }}>
      <ResponsivePie
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
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [{ on: "hover", style: { itemTextColor: "#000" } }],
          },
        ]}
      />
    </div>
  );
};

export default PieChart;
