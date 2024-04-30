import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useAuth } from "../hooks/AuthContext";
import {Box} from "@mui/material";
import { tokens } from "../theme";
const BarChart = ({data}) => {
  const { auth } = useAuth();
  

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    (data &&<Box style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        theme={{
            // added
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
        keys={["balance"]}
        indexBy="type"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "set3" }} // You can adjust the color scheme as needed
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Account Type",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Balance ($)",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            translateX: 120,
            itemWidth: 100,
            itemHeight: 20,
            itemOpacity: 0.85,
            symbolSize: 20,
          },
        ]}
        role="application"
        ariaLabel="Bar chart displaying balances"
        barAriaLabel={({ id, value, indexValue }) =>
          `${id}: $${value} in ${indexValue}`
        }
      />
    </Box>)
  );
};

export default BarChart;
