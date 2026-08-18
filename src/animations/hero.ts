"use client";

import gsap from "gsap";

export const initHeroAnimation = () => {
  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  timeline
    .from(".hero-eyebrow", {
      opacity: 0,
      y: 20,
      duration: 0.8,
    })
    .from(
      ".hero-title-line",
      {
        opacity: 0,
        y: 80,
        duration: 1,
        stagger: 0.12,
      },
      "-=0.4",
    )
    .from(
      ".hero-description",
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
      },
      "-=0.5",
    )
    .from(
      ".hero-cta",
      {
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
      },
      "-=0.4",
    )
    .from(
      ".hero-meta",
      {
        opacity: 0,
        duration: 0.8,
      },
      "-=0.4",
    );

  return timeline;
};
