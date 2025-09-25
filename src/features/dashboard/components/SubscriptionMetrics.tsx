"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Point = { x: number; y: number };

type SubscriptionMetricsProps = {
  title?: string;
  value: string;
  percentageChange: number;
  period?: string;
  chartData: Point[];
};

const colorConfig = {
  positive: { text: "text-green-600", stroke: "#16a34a", fill: "#dcfce7" },
  negative: { text: "text-red-600", stroke: "#dc2626", fill: "#fee2e2" },
  neutral: { text: "text-yellow-600", stroke: "#ca8a04", fill: "#fef3c7" },
};

const getColorClasses = (percentage: number) => {
  if (percentage > 5) return colorConfig.positive;
  if (percentage < -5) return colorConfig.negative;
  return colorConfig.neutral;
};

const createSmoothPath = (points: Point[]) => {
  if (points.length < 2) return "";
  return points.reduce((path, point, i, arr) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    if (i === 1) return path + ` L ${point.x} ${point.y}`;

    const prev = arr[i - 1];
    const controlX = (prev.x + point.x) / 2;
    const controlY = (prev.y + point.y) / 2;
    const segment = ` Q ${prev.x} ${prev.y} ${controlX} ${controlY}`;

    return (
      path + segment + (i === arr.length - 1 ? ` T ${point.x} ${point.y}` : "")
    );
  }, "");
};

const createSmoothAreaPath = (points: Point[]) => {
  if (!points.length) return "";
  const linePath = createSmoothPath(points);
  const { x: lastX } = points[points.length - 1];
  const { x: firstX } = points[0];
  return `${linePath} L ${lastX} 100 L ${firstX} 100 Z`;
};

export const SubscriptionMetrics = ({
  title = "Subscriptions",
  value,
  percentageChange,
  period = "from last month",
  chartData,
}: SubscriptionMetricsProps) => {
  const colors = getColorClasses(percentageChange);

  return (
    <Card className="w-full p-0 overflow-hidden gap-0">
      <CardHeader className="flex items-start justify-between gap-4 pt-4 px-5">
        <div>
          <h3 className="text-sm font-normal text-gray-600">{title}</h3>
          <p className="text-2xl font-medium text-gray-900">{value}</p>
        </div>
        <p className={`text-sm font-medium ${colors.text}`}>
          {percentageChange > 0 ? "+" : ""}
          {percentageChange}% {period}
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 240 80"
          className="overflow-visible"
        >
          <path
            d={createSmoothAreaPath(chartData)}
            fill={colors.fill}
            opacity="0.8"
          />
          <path
            d={createSmoothPath(chartData)}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CardContent>
    </Card>
  );
};
