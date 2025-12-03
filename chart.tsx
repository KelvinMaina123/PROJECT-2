import React from "react";
import { Tooltip, Legend, ResponsiveContainer, LegendPayload } from "recharts";
import { cn } from "@/lib/utils";
import { ChartContext, useChart } from "./ChartContext";
import { getPayloadConfigFromPayload, ChartPayloadItem } from "./chartUtils";

// --- Chart Types ---
export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
    theme?: Record<"light" | "dark", string>;
  };
};

// Layout type (optional)
export type RechartsLayoutType = "horizontal" | "vertical" | "centric" | "radial";

// --- Chart Container ---
export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { config: ChartConfig; children: React.ReactNode }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

// --- Chart Style ---
const THEMES = { light: "", dark: ".dark" } as const;

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, cfg]) => cfg.theme || cfg.color
  );
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => {
            const vars = colorConfig
              .map(([key, cfg]) => {
                const color =
                  cfg.theme?.[theme as keyof typeof cfg.theme] || cfg.color;
                return color ? `--color-${key}: ${color};` : null;
              })
              .filter(Boolean)
              .join("\n");
            return `${prefix} [data-chart=${id}] { ${vars} }`;
          })
          .join("\n"),
      }}
    />
  );
};

// --- Chart Tooltip ---
export const ChartTooltip = Tooltip;

export interface ChartTooltipContentProps extends React.ComponentProps<"div"> {
  active?: boolean;
  payload?: ChartPayloadItem[];
  label?: string | number;
  hideLabel?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
}

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(({
  active,
  payload,
  className,
  hideLabel = false,
  indicator = "dot",
  label,
  nameKey,
  labelKey,
}, ref) => {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  const tooltipLabel = (() => {
    if (hideLabel || !payload.length) return null;
    const [item] = payload;
    const key = `${labelKey || item.dataKey || item.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && label !== undefined ? label : itemConfig?.label;
    if (!value) return null;
    return <div className="font-medium">{value}</div>;
  })();

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-32 items-start gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs shadow-lg dark:bg-gray-800 dark:border-gray-600",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item: ChartPayloadItem) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          return (
            <div key={key} className="flex w-full flex-wrap items-stretch gap-2">
              {itemConfig?.icon ? <itemConfig.icon /> : null}
              <div className="flex flex-1 justify-between leading-none">
                <span>{String(itemConfig?.label || item.name || "")}</span>
                <span>{item.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
ChartTooltipContent.displayName = "ChartTooltipContent";

// --- Chart Legend ---
type ChartLegendProps = {
  content?: React.ComponentType<any> | ((props: any) => React.ReactNode);
  nameKey?: string;
};

export const ChartLegend = React.forwardRef<HTMLDivElement, ChartLegendProps>(
  ({ content, nameKey, ...props }, ref) => {
    const { config } = useChart();

    return (
      <div ref={ref} className="flex flex-wrap items-center justify-center gap-6" {...props}>
        <Legend
          content={(props) => {
            if (!props.payload?.length) return null;
            const legendProps = { ...props, payload: props.payload as LegendPayload[] };

            if (content) {
              if (typeof content === "function") {
                return (content as (props: any) => React.ReactNode)(legendProps);
              }
              return React.createElement(content as React.ComponentType<any>, legendProps);
            }

            return (
              <div className="flex items-center justify-center gap-4">
                {legendProps.payload.map((item) => {
                  const key = `${nameKey || item.dataKey || item.value}`;
                  const cfg = config[key as keyof typeof config];
                  return (
                    <div key={key} className="flex items-center gap-1.5">
                      <span
                        className="h-3 w-3 shrink-0 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-300">
                        {cfg?.label || item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          }}
        />
      </div>
    );
  }
);
ChartLegend.displayName = "ChartLegend";
