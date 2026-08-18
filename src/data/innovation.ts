import { MoleculeBadge } from "@/types";

export const genomicSequence =
  "ATCGGCTAGCTAGCTTACGATCGGCTAGCTAGCTTACG · CGTAGCTTACG · GCTAGCTAGCT · ATCGGCTAG · TACGATCGGC · TAGCTAGCTTA · CRISPR-Cas9 · sgRNA · HDR · NHEJ · Gene Drive · Epigenome · Proteomics · Metabolomics · scRNA-seq · ";

export const molecules: MoleculeBadge[] = [
  {
    label: "ATP",
    sub: "C\u2081\u2080H\u2081\u2086N\u2085O\u2081\u2083P\u2083",
    x: "72%",
    y: "14%",
  },
  { label: "mRNA", sub: "Messenger RNA", x: "80%", y: "50%" },
  { label: "CRISPR", sub: "Cas9 Complex", x: "58%", y: "76%" },
  { label: "DNA", sub: "Double Helix", x: "86%", y: "28%" },
  { label: "Protein", sub: "Folded Chain", x: "63%", y: "40%" },
];

export const innovationTags: string[] = [
  "CRISPR-Cas9",
  "Base Editing",
  "Prime Editing",
  "Epigenomics",
  "scRNA-seq",
  "Proteomics",
  "Gene Circuits",
];
