export interface CapabilityItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  accent: string;
  glow: string;
}

export interface ResearchProgram {
  idx: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export interface StatisticItem {
  value: string;
  label: string;
  subtext: string;
  delta: string;
  color: string;
}

export interface MetricItem {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
}

export interface MoleculeBadge {
  label: string;
  sub: string;
  x: string;
  y: string;
}

export interface TechnologyItem {
  id?: string;
  word: string;
  category: string;
  image: string;
  italic?: boolean;
  styleType?: "bold-sans" | "serif-italic" | "mono-badge" | "serif-title" | "outline-sans";
  highlightColor?: string;
  description?: string;
  stats?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "twitter" | "linkedin";
}

export interface HeroMetaItem {
  label: string;
  value: string;
}
