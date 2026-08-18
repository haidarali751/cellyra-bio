"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { researchPrograms } from "@/data";

export const Research = () => {
  return (
    <section
      id="research"
      className="relative py-32 overflow-hidden bg-(--cellyra-bg) text-(--cellyra-text) transition-colors duration-500"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-100"
        aria-hidden="true"
      >
        <div
          className="absolute left-[20%] top-[20%] h-125 w-125 rounded-full blur-[160px]"
          style={{
            background:
              "radial-gradient(circle, var(--cellyra-border) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[10%] top-[10%] h-100 w-100 rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, var(--cellyra-border) 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="cellyra-noise absolute inset-0 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-(--cellyra-text) opacity-40" />
          <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-(--cellyra-muted)">
            02 // Research Pipeline &amp; Discovery
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-6 max-w-3xl font-heading text-4xl sm:text-6xl font-bold tracking-tight text-(--cellyra-text) leading-[1.05]"
        >
          From discovery to biological intelligence.
        </motion.h2>
      </div>

      <div className="w-full px-1 sm:px-1 md:px-1 lg:px-1 mt-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="group/row flex flex-col md:flex-row w-full gap-2 md:h-[70vh] min-h-130 p-2 overflow-hidden"
        >
          {researchPrograms.map((program) => {
            return (
              <div
                key={program.idx}
                className="group relative flex-none md:flex-1 md:group-hover/row:flex-[0.6] md:hover:flex-[3.5]! overflow-hidden transition-[flex-grow,flex-basis,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex items-end min-w-0 h-62.5 md:h-full select-none transform-gpu will-change-[flex-grow] border border-(--cellyra-border)"
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-out scale-105 group-hover:scale-100 transform-gpu">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover transition-opacity duration-500 opacity-60 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={program.idx === "01"}
                  />
                </div>
                <div
                  className="absolute inset-0 opacity-90 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, #04050a 0%, rgba(4,5,10,0.65) 50%, rgba(4,5,10,0.15) 100%)",
                  }}
                />
                <div className="relative z-10 p-6 md:p-8 w-full text-white flex flex-col justify-end h-full pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white w-fit">
                      {program.idx}
                    </span>
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">
                      {program.category}
                    </span>
                  </div>

                  <h3 className="mt-3 font-heading text-xl sm:text-2xl font-bold tracking-tight text-white whitespace-nowrap overflow-hidden text-ellipsis">
                    {program.title}
                  </h3>

                  <div className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <p className="mt-2 font-sans text-xs sm:text-sm leading-relaxed text-white/85 line-clamp-2">
                      {program.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
