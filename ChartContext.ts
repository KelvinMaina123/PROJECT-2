import React from "react";
import { ChartConfig } from "./chart"; // adjust path if needed

interface ChartContextProps {
  config: ChartConfig;
}

export const ChartContext = React.createContext<ChartContextProps | null>(null);

export const useChart = () => {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within <ChartContainer>");
  return context;
};
