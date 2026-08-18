"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const FinalCTA = () => {
  return (
    <section id="contact" className="relative px-6 py-40 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-125 w-175">
          <Image
            src="/images/cta/future-biology.svg"
            alt=""
            fill
            className="object-contain"
            sizes="700px"
          />
        </div>
      </div>

      <div className="cellyra-noise absolute inset-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="cta-content mx-auto max-w-7xl relative z-10 rounded-[2.5rem] border border-(--cellyra-border) bg-(--cellyra-surface) p-10 sm:p-20 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-(--cellyra-text) opacity-40" />
          <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-(--cellyra-muted)">
            06 // Collaboration &amp; Future Development
          </span>
        </div>

        <h2 className="mt-8 max-w-4xl font-heading text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-(--cellyra-text) leading-[0.95]">
          Let's engineer
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, var(--cellyra-text) 10%, var(--cellyra-muted) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            what's next.
          </span>
        </h2>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <button className="cellyra-button cellyra-button-primary font-mono text-xs uppercase tracking-[0.18em] font-semibold cursor-pointer">
            Start a conversation →
          </button>
          <span className="font-mono text-xs text-(--cellyra-muted)">
            INQUIRIES // PARTNERSHIPS@CELLYRA.BIO
          </span>
        </div>
      </motion.div>
    </section>
  );
};
