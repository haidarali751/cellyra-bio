import { StatisticItem, MetricItem } from "@/types";

export const stats: StatisticItem[] = [
  {
    value: "98%",
    label: "Prediction Accuracy",
    subtext: "Validated across de novo structural benchmarks",
    delta: "+14% vs benchmark",
    color: "#00ffa3",
  },
  {
    value: "42+",
    label: "Research Programs",
    subtext: "Active biological pipelines across multiple targets",
    delta: "Multi-target pipeline",
    color: "#00d4ff",
  },
  {
    value: "12M+",
    label: "Data Points Analyzed",
    subtext: "Multi-omics datasets ingested and mapped",
    delta: "Petabyte-scale compute",
    color: "#a855f7",
  },
  {
    value: "24",
    label: "Global Partners",
    subtext: "Tier-1 academic institutions & biotechnology leaders",
    delta: "Worldwide network",
    color: "#ffb830",
  },
];

export const innovationMetrics: MetricItem[] = [
  { value: 99.7, decimals: 1, suffix: "%", label: "Gene Edit Precision" },
  { value: 3.2, decimals: 1, suffix: "B", label: "Base Pairs Analyzed" },
  { value: 847, decimals: 0, suffix: "+", label: "Protein Structures" },
  { value: 14, decimals: 0, suffix: "ms", label: "Seq. Processing Time" },
];
