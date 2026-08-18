"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HeroScrollAnimation = () => {
  useLayoutEffect(() => {
    const hero = document.querySelector(".hero-section");

    if (!hero) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      timeline
        .to(
          ".hero-content",
          {
            y: -120,
            opacity: 0,
            ease: "none",
          },
          0,
        )
        .to(
          ".hero-molecule",
          {
            scale: 1.25,
            x: 100,
            y: -80,
            opacity: 0.25,
            ease: "none",
          },
          0,
        )
        .to(
          ".hero-background-glow",
          {
            scale: 1.4,
            opacity: 0,
            ease: "none",
          },
          0,
        );
    }, hero);

    return () => {
      ctx.revert();
    };
  }, []);

  return null;
};
