"use client";

import { useRef } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export const MagneticButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const transform = useTransform(
    [rotateX, rotateY],
    ([rx, ry]) => `rotateX(${rx}) rotateY(${ry})`,
  );

  return (
    <button
      ref={ref}
      style={{ transform: transform as unknown as string }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const xVal = (e.clientX - rect.left) / rect.width - 0.5;
        const yVal = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xVal);
        y.set(yVal);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      {...props}
    >
      {children}
    </button>
  );
};
